using RepoTag.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Data.Repositories
{
    class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class, IAggregateRoot
    {
        protected readonly RepoTagDbContext Db;

        public RepositoryBase(RepoTagDbContext context)
        {
            Db = context;
        }

        public TEntity Add(TEntity entity)
        {
            return Db.Set<TEntity>().Add(entity).Entity;
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            Db.Set<TEntity>().AddRange(entities);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return Db.Set<TEntity>();
        }

        public TEntity GetById(Guid id)
        {
            return Db.Set<TEntity>().Find(id);
        }

        public void Remove(TEntity obj)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            throw new NotImplementedException();
        }

        public void Update(TEntity obj)
        {
            throw new NotImplementedException();
        }

        public void UpdateRange(IEnumerable<TEntity> entities)
        {
            throw new NotImplementedException();
        }
    }
}
