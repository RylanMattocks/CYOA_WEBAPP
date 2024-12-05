using Game.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Game.Data;

public class GameContext : DbContext{
    public GameContext() : base() {}
    public GameContext(DbContextOptions<GameContext> options) : base(options) {}
    public DbSet<User> Users { get; set; }
    public DbSet<Save> Saves { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Save>()
            .HasOne(s => s.User)
            .WithMany(u => u.Saves)
            .HasForeignKey(s => s.Username)
            .OnDelete(DeleteBehavior.Cascade);
    }
}