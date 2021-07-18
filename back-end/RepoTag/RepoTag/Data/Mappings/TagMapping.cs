﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RepoTag.Domain.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Data.Mappings
{
    class TagMapping : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder.ToTable("Tags", schema: "RepoTag");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Name).HasColumnName("Name").IsRequired();
            builder.Property(b => b.Color).HasColumnName("Color").IsRequired();

            builder.HasOne(b => b.User)
                .WithMany()
                .HasForeignKey("UserId")
                .IsRequired();
        }
    }
}
