using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext context;

        public DatingRepository(DataContext _context){

            this.context=_context;

        }
        public void Add<T>(T entity) where T : class
        {
            this.context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            this.context.Remove(entity);
        }

        public async Task<User> GetUserAsync(int id)
        {
            var user= await context.Users.Include(p=> p.Photos).FirstOrDefaultAsync(u=> u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            var users = await context.Users.Include("Photos").ToListAsync();

            return users;
        }
        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
        
    }
}