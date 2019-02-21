using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IDatingRepository repository;

        public IMapper Mapper { get; }

        public UsersController(IDatingRepository _repository, IMapper mapper){
            this.repository = _repository;
            Mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(){
             var users = await repository.GetUsersAsync();
             var usersToReturn = Mapper.Map<IEnumerable<UserForListDto>>(users);
             return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id){
             var user= await repository.GetUserAsync(id);
             var userToReturn = Mapper.Map<UserForDetailsDto >(user);
              return Ok(userToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id,UserForUpdateDto userforUpdate){

             if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) 
                 return Unauthorized(); 

             var userFromRepo = await repository.GetUserAsync(id);
            Mapper.Map(userforUpdate,userFromRepo );

            if(await repository.SaveAll())
                return NoContent();

            throw new Exception($"update user {id} failed on save");
        }
    }
}