using System.Text.Json.Serialization;
using harzem_salon.Entities;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Add services to the container.

builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
        {
            // Prevents cycles and "Possible object cycle detected" error
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

builder.Services.AddDbContext<HarzemSalonContext>();

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowHarzemSalon", _builder =>
        {
            _builder.WithOrigins(builder.Configuration["HarzemSalon:AllowedCors"]!)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "HarzemSalonApi",
            ValidAudience = "HarzemSalon",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["HarzemSalon:JwtSecret"]!))
        };
    });

builder.Services.AddSingleton<IFileProvider>(new PhysicalFileProvider(Directory.GetCurrentDirectory()));

builder.Services.AddRateLimiter(_ =>
{
    _.AddFixedWindowLimiter(policyName: "fixed_default", opt =>
    {
        opt.Window = TimeSpan.FromSeconds(15);
        opt.PermitLimit = 12;
    }).RejectionStatusCode = 429;
    _.AddFixedWindowLimiter(policyName: "fixed_serveImage", opt =>
    {
        opt.Window = TimeSpan.FromHours(1);
        opt.PermitLimit = 1200;
        opt.QueueLimit = 6;
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    }).RejectionStatusCode = 429;
    _.AddFixedWindowLimiter(policyName: "fixed_cmsLogin", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 10;
    }).RejectionStatusCode = 429;
});

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowHarzemSalon");
app.UseRateLimiter(); // After routing
app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
