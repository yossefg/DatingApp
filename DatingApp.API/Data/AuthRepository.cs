using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
         private readonly DataContext context;
        public AuthRepository(DataContext context)
        {
            this.context = context;
        }
    public async Task<User> Login(string userName, string password)
    {
     var user = await this.context.Users.FirstOrDefaultAsync(u=> u.UserName == userName);

        if(user==null)
            return null;

        if(VerifyPassWordHash(password,user.PasswordHash,user.PasswordSalt) ){
           return user;
        }
        return null;

    }

        private bool VerifyPassWordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
           using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){
             var computedHash =hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            for(int i=0;i< computedHash.Length ; i++){
                if(computedHash[i]!= passwordHash[i])
                    return false;
            }
           }
           return true;
        }

        public async Task<User> Register(User user, string passWord)
    {
       byte[] passWordHash ,passwordSalt;
       CreatePasswordHash(passWord,out passWordHash,out passwordSalt);
       user.PasswordHash = passWordHash;
       user.PasswordSalt = passwordSalt;
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
        return user;
    }

        private void CreatePasswordHash(string password, out byte[] passWordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passWordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password) );
            }
        }

        public async Task<bool> UserExists(string userName)
    {
        return await context.Users.AnyAsync(u=> u.UserName == userName);
    }
}
}