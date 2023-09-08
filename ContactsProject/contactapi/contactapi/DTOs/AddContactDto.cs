using System;
using System.Text.Json.Serialization;

namespace contactapi.DTOs
{
	public class AddContactDto
	{
        [JsonPropertyName("firstname")]
        public string Firstname { get; set; }
        [JsonPropertyName("lastname")]
        public string Lastname { get; set; }
        [JsonPropertyName("phone")]
        public string Phone { get; set; }


		public AddContactDto()
		{ }
		
	}
}

