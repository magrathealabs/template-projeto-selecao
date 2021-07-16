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

            builder.HasKey(b => new { RepositoryId = b.Repository.Id, TagId = b.Tag.Id });

            builder.Property(b => b.Repository).HasColumnName("RepositoryId").IsRequired();
            builder.Property(b => b.Tag).HasColumnName("TagId").IsRequired();

            builder.HasOne(b => b.Tag)
                .WithMany()
                .HasForeignKey("TagId");

            builder.HasOne(b => b.Repository)
                .WithMany()
                .HasForeignKey("RepositoryId");
        }
    }
}
