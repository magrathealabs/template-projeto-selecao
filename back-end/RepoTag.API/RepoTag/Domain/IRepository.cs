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
        void AddRange(List<T> entities);
    }
}
