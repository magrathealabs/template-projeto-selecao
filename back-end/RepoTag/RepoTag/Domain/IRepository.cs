using System;
using System.Collections.Generic;
using System.Text;

namespace RepoTag.Domain
{
    public interface IRepository<T> where T : IAggregateRoot
    {
        T GetById(Guid id);
        IEnumerable<T> GetAll();
        T Add(T entity);
        void AddRange(IEnumerable<T> entities);
        void Remove(T obj);
        void RemoveRange(IEnumerable<T> entities);
        void Update(T obj);
        void UpdateRange(IEnumerable<T> entities);
    }
}
