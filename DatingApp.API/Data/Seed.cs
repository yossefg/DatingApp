using System.Collections.Generic;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext context;
        public Seed(DataContext _context)
        {
            this.context = _context;

        }
        public void SeedUsers(){
                var userData = System.IO.File.ReadAllText("Data/UserDataSeedJson.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach(var user in users){
                    byte[] passwordHash ,passwordSalt;
                    CreatePasswordHash("password",out passwordHash,out passwordSalt);
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.UserName = user.UserName.ToLower();
                    context.Users.Add(user);
                }
            context.SaveChanges();
        }
         private void CreatePasswordHash(string password, out byte[] passWordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passWordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password) );
            }
        }
    }
}