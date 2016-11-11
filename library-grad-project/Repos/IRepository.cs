using LibraryGradProject.Context;
using System.Collections.Generic;

namespace LibraryGradProject.Repos
{
    public interface IRepository<T>
    {
        T Get(int id);
        IEnumerable<T> GetAll();
        void Add(T entity);
        void Remove(int id);
    }
}