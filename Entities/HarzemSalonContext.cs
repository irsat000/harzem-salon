using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace harzem_salon.Entities;

public partial class HarzemSalonContext : DbContext
{
    public HarzemSalonContext()
    {
    }

    public HarzemSalonContext(DbContextOptions<HarzemSalonContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<DiscountCombination> DiscountCombinations { get; set; }

    public virtual DbSet<Gallery> Galleries { get; set; }

    public virtual DbSet<MiniGalleryImage> MiniGalleryImages { get; set; }

    public virtual DbSet<OurService> OurServices { get; set; }

    public virtual DbSet<ServiceCategory> ServiceCategories { get; set; }

    public virtual DbSet<Testimonial> Testimonials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=HarzemSalon:ConnectionString");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Admins__3213E83FA2D60BBC");

            entity.HasIndex(e => e.adminName, "UQ__Admins__330679FE491D47A7").IsUnique();

            entity.Property(e => e.adminName).HasMaxLength(255);
            entity.Property(e => e.adminPassword).HasMaxLength(255);
        });

        modelBuilder.Entity<DiscountCombination>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Discount__3213E83F46AEBCA7");

            entity.Property(e => e.combination).HasMaxLength(255);
        });

        modelBuilder.Entity<Gallery>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Gallery__3213E83F7CAA7226");

            entity.ToTable("Gallery");

            entity.Property(e => e.uploadDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<MiniGalleryImage>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__MiniGall__3213E83F7C611F39");

            entity.Property(e => e.imageLink).HasMaxLength(255);

            entity.HasOne(d => d.service).WithMany(p => p.MiniGalleryImages)
                .HasForeignKey(d => d.serviceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MiniGalleryImages_OurServices");
        });

        modelBuilder.Entity<OurService>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__OurServi__3213E83F94406CDB");

            entity.Property(e => e.serviceCode).HasMaxLength(100);
            entity.Property(e => e.serviceName).HasMaxLength(100);

            entity.HasOne(d => d.cate).WithMany(p => p.OurServices)
                .HasForeignKey(d => d.cateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OurServices_ServiceCategories");
        });

        modelBuilder.Entity<ServiceCategory>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__ServiceC__3213E83FF3FFFE1B");

            entity.Property(e => e.id).ValueGeneratedNever();
            entity.Property(e => e.cateCode).HasMaxLength(100);
        });

        modelBuilder.Entity<Testimonial>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Testimon__3213E83FC295D3BC");

            entity.Property(e => e.fullName).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
