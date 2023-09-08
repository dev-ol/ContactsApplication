using System;
using contactapi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace contactapi.Services
{
	public class ContactAppContext : DbContext
	{
		public DbSet<Contact> Contacts { get; set; }

		public ContactAppContext(DbContextOptions<ContactAppContext> options) : base(options)
		{
           
        }
	}
}

