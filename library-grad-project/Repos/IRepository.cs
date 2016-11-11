using LibraryGradProject.Context;
using System.Collections.Generic;

namespace LibraryGradProject.Repos
{
    public abstract class IRepository<T>
    {
        private BookContext context;

        public IRepository()
        {
        }

        public IRepository(BookContext ctx)
        {
            context = ctx;
        }

        public BookContext GetContext()
        {
            if (context == null)
            {
                return new BookContext();
            } else
            {
                return context;
            }
        }

        public abstract T Get(int id);
        public abstract IEnumerable<T> GetAll();
        public abstract void Add(T entity);
        public abstract void Remove(int id);
    }
}