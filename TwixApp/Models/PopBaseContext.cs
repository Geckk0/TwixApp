using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TwixApp.Models;

public partial class PopBaseContext : DbContext
{
    protected readonly IConfiguration Configuration;
    public PopBaseContext()
    {
    }

    public PopBaseContext(DbContextOptions<PopBaseContext> options, IConfiguration configuration)
        : base(options)
    {
        Configuration = configuration;
    }

    public virtual DbSet<Edition> Editions { get; set; }

    public virtual DbSet<Pop> Pops { get; set; }

    public virtual DbSet<PopEdition> PopEditions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(Configuration.GetConnectionString("TwixDatabase"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Edition>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__editions__3213E83F7E1806C9");

            entity.ToTable("editions");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasColumnType("varchar")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Pop>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__pops__3213E83F35E11774");

            entity.ToTable("pops");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.ImgUrl)
                .HasColumnType("text")
                .HasColumnName("img_url");
            entity.Property(e => e.Name)
                .HasColumnType("varchar")
                .HasColumnName("name");
            entity.Property(e => e.Number).HasColumnName("number");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.Series)
                .HasColumnType("varchar")
                .HasColumnName("series");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Pops)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__pops__user_id__29572725");
        });

        modelBuilder.Entity<PopEdition>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("popEditions");

            entity.Property(e => e.EditionsId).HasColumnName("editions_id");
            entity.Property(e => e.PopId).HasColumnName("pop_id");

            entity.HasOne(d => d.Editions).WithMany()
                .HasForeignKey(d => d.EditionsId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__popEditio__editi__2B3F6F97");

            entity.HasOne(d => d.Pop).WithMany()
                .HasForeignKey(d => d.PopId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__popEditio__pop_i__2A4B4B5E");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__users__3213E83FB2E5AF27");

            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Email)
                .HasColumnType("varchar")
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasColumnType("varchar")
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasColumnType("varchar")
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
