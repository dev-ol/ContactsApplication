
using contactapi.DTOs;
using contactapi.Models;
using contactapi.Services;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace contactapi.Controllers
{

    [Route("api/contacts")]
    public class ContactController : ControllerBase
    {
       //database context
        private readonly ContactAppContext _context;

        public ContactController(ContactAppContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet()]
        public async Task<IActionResult> GetAllContactsAsync()
        {
            //getting user information from jwt sent with request
            FirebaseToken firebaseToken = await FirebaseService.getUserInfo(Request);

            if (firebaseToken != null)
            {
                //getting contacts per user
                IList<Contact> contacts = await _context.Contacts.Where(x => x.OwnerId == firebaseToken.Uid).ToListAsync();

                return Ok(contacts);
            }

            return Unauthorized();


        }

        //test method to check contact list
        //remove 
        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {


            var token = await FirebaseService.getUserInfo(Request);

            IList<Contact> contacts = await _context.Contacts.ToListAsync();

            return Ok(contacts);
        }

        [Authorize]
        [HttpPost()]
        public async Task<IActionResult> SaveNewContact([FromBody] AddContactDto addContactDto)
        {
            //getting user information from jwt sent with request
            FirebaseToken firebaseToken = await FirebaseService.getUserInfo(Request);

            if (firebaseToken != null)
            {
                //create new contact from dto; casting
                Contact newContact = new Contact(firebaseToken.Uid, addContactDto);

                if (newContact.isValid())
                {
                    //adding to dbset
                    _context.Contacts.Add(newContact);
                    //updating the database
                    await _context.SaveChangesAsync();

                    return Ok(addContactDto);
                }

                return BadRequest(new { _error = "Check format or missing props" });
            }
            else
            {
                return Unauthorized();
            }
        }

        [Authorize]
        [HttpPut()]
        public async Task<IActionResult> EditContactAsync([FromBody] EditContactDto editContactDto)
        {
            FirebaseToken firebaseToken = await FirebaseService.getUserInfo(Request);

            if (firebaseToken != null)
            {
                //user has to own the contact to see
                var contact = await _context.Contacts.FirstOrDefaultAsync(x => (x.Id ==
                    Guid.Parse(editContactDto.Id)) && (x.OwnerId == firebaseToken.Uid));

                if (contact == null)
                {
                    return NotFound();
                }


                contact.Firstname = editContactDto.Firstname;
                contact.Lastname = editContactDto.Lastname;
                contact.Phone = editContactDto.Phone;

                _context.Entry(contact).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    var contactCreated = await _context.Contacts.FindAsync(contact.Id);

                    if (contactCreated != null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
            else
            {
                return Unauthorized();
            }

        }

        [Authorize]
        [HttpDelete()]
        public async Task<IActionResult> DeleteContact([FromQuery] string contactId)
        {
            FirebaseToken firebaseToken = await FirebaseService.getUserInfo(Request);

            if (firebaseToken != null)
            {
                var contact = await _context.Contacts.FirstOrDefaultAsync(x => (x.Id ==
                    Guid.Parse(contactId)) && (x.OwnerId == firebaseToken.Uid));


                if (contact != null)
                {
                    _context.Contacts.Remove(contact);

                    await _context.SaveChangesAsync();

                    return NoContent();

                }
                return NotFound();
            }
            else
            {
                return Unauthorized();
            }
        }



    }
}

