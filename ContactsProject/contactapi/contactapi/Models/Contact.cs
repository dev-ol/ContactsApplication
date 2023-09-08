using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using contactapi.DTOs;

namespace contactapi.Models
{
	
	public class Contact
	{
        [Required,Key]
        public Guid Id { get; set; }


        [MinLength(1), Required]
        public string Firstname { get; set; }

        [MinLength(1)]
        public string Lastname { get; set; }

        [Required, MaxLength(20), MinLength(10)]
        public string Phone { get; set; }

        [Required]
        public string OwnerId { get; set; }


        public Contact()
		{

		}


        public Contact(string userId, AddContactDto addContactDto)
        {
            Id = Guid.NewGuid();
            Firstname = addContactDto.Firstname;
            Lastname = addContactDto.Lastname;
            Phone = FormatPhone(addContactDto.Phone);
            OwnerId = userId;

        }

        public Contact(EditContactDto editContactDto)
        {
            Id = Guid.Parse(editContactDto.Id);
            Firstname = editContactDto.Firstname;
            Lastname = editContactDto.Lastname;
            Phone = FormatPhone(editContactDto.Phone);

        }


        public bool isValid()
        {
            
            
            return ValidatePhoneNumber();
        }

        //validates the phonenumber
        private bool ValidatePhoneNumber()
        {
             const string regex = @"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$";

            return Regex.IsMatch(Phone, regex);
        }

        //fortmat the phone number
        private string FormatPhone(string number)
        {
            return Regex.Replace(number, @"(\d{3})(\d{3})(\d{4})", "$1-$2-$3");
        }

        
    }
}

