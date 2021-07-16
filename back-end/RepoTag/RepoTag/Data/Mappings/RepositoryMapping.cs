using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RepoTag.Domain.Tags;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Data.Mappings
{
    class RepositoryMapping : IEntityTypeConfiguration<Repository>
    {
        public void Configure(EntityTypeBuilder<Repository> builder)
        {
            builder.ToTable("Repositories", schema: "RepoTag");

            builder.HasKey(b => b.Id);
        }
    }
}
