using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RepoTag.Domain.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Data.Mappings
{
    class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users", schema: "RepoTag");

            builder.HasKey(b => b.Id);
        }
    }
}
