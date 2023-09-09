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

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<DeletedCustomer> DeletedCustomers { get; set; }

    public virtual DbSet<DeletedNewComer> DeletedNewComers { get; set; }

    public virtual DbSet<DiscountCombination> DiscountCombinations { get; set; }

    public virtual DbSet<Gallery> Galleries { get; set; }

    public virtual DbSet<MiniGalleryImage> MiniGalleryImages { get; set; }

    public virtual DbSet<NewComer> NewComers { get; set; }

    public virtual DbSet<OurService> OurServices { get; set; }

    public virtual DbSet<ServiceCategory> ServiceCategories { get; set; }

    public virtual DbSet<Testimonial> Testimonials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=HarzemSalon;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Admins__3213E83FF208142A");

            entity.HasIndex(e => e.adminName, "UQ__Admins__330679FEAB581536").IsUnique();

            entity.Property(e => e.adminName).HasMaxLength(255);
            entity.Property(e => e.adminPassword).HasMaxLength(255);
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Customer__3213E83F6F9429B2");

            entity.ToTable(tb => tb.HasTrigger("trg_CustomerDeletion"));

            entity.HasIndex(e => e.customerNO, "UQ__Customer__B611F2374FFD983C").IsUnique();

            entity.HasIndex(e => e.fullName, "UQ__Customer__C8B4CE9F0C32DBF4").IsUnique();

            entity.Property(e => e.balance)
                .HasDefaultValueSql("((0.00))")
                .HasColumnType("decimal(10, 2)");
            entity.Property(e => e.fullName).HasMaxLength(255);
            entity.Property(e => e.pinCode).HasMaxLength(60);
        });

        modelBuilder.Entity<DeletedCustomer>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__DeletedC__3213E83F7ED0C73A");

            entity.Property(e => e.balance).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.deletionDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.fullName).HasMaxLength(255);
            entity.Property(e => e.pinCode).HasMaxLength(60);
        });

        modelBuilder.Entity<DeletedNewComer>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__DeletedN__3213E83F12617D7B");

            entity.Property(e => e.deletionDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.fullName).HasMaxLength(255);
        });

        modelBuilder.Entity<DiscountCombination>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Discount__3213E83F34468264");

            entity.Property(e => e.combination).HasMaxLength(255);
        });

        modelBuilder.Entity<Gallery>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Gallery__3213E83FF014812E");

            entity.ToTable("Gallery");

            entity.Property(e => e.uploadDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<MiniGalleryImage>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__MiniGall__3213E83F006855A8");

            entity.HasOne(d => d.service).WithMany(p => p.MiniGalleryImages)
                .HasForeignKey(d => d.serviceId)
                .HasConstraintName("FK_MiniGalleryImages_OurServices");
        });

        modelBuilder.Entity<NewComer>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__NewComer__3213E83F02679E1F");

            entity.Property(e => e.fullName).HasMaxLength(255);

            entity.HasOne(d => d.customerNONavigation).WithMany(p => p.NewComers)
                .HasPrincipalKey(p => p.customerNO)
                .HasForeignKey(d => d.customerNO)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NewComer_Customer");
        });

        modelBuilder.Entity<OurService>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__OurServi__3213E83F3CEDD159");

            entity.Property(e => e.serviceCode).HasMaxLength(100);
            entity.Property(e => e.serviceName).HasMaxLength(100);

            entity.HasOne(d => d.cate).WithMany(p => p.OurServices)
                .HasForeignKey(d => d.cateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OurServices_ServiceCategories");
        });

        modelBuilder.Entity<ServiceCategory>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__ServiceC__3213E83FB1729E69");

            entity.Property(e => e.cateCode).HasMaxLength(100);
        });

        modelBuilder.Entity<Testimonial>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__Testimon__3213E83F79FB0C60");

            entity.Property(e => e.fullName).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
