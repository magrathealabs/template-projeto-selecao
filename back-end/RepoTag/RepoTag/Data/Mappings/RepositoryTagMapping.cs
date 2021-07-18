using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RepoTag.Domain.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Data.Mappings
{
    class RepositoryTagMapping : IEntityTypeConfiguration<RepositoryTag>
    {
        public void Configure(EntityTypeBuilder<RepositoryTag> builder)
        {
            builder.ToTable("RepositoryTags", schema: "RepoTag");

            builder.HasKey(b => new { b.RepositoryId, b.TagId });

            builder.Property(b => b.RepositoryId).HasColumnName("RepositoryId").IsRequired();
            builder.Property(b => b.TagId).HasColumnName("TagId").IsRequired();

            builder.HasOne(b => b.Tag)
                .WithMany()
                .HasForeignKey("TagId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne<Repository>()
                .WithMany()
                .HasForeignKey("RepositoryId");
        }
    }
}
