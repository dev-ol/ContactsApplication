using System;
using System.Text.Json.Serialization;

namespace contactapi.DTOs
{
	public class EditContactDto
	{
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("firstname")]
        public string Firstname { get; set; }
        [JsonPropertyName("lastname")]
        public string Lastname { get; set; }
        [JsonPropertyName("phone")]
        public string Phone { get; set; }

        public EditContactDto()
		{

		}
	}
}

