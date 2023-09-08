using System;
using FirebaseAdmin;
using FirebaseAdmin.Auth;

namespace contactapi.Services
{
	public class FirebaseService

	{ 
	
		public FirebaseService()
		{
            

        }

        public static async Task<FirebaseToken> getUserInfo(HttpRequest request)
        {
            //getting the token from the header
            string bToken = request.Headers["Authorization"];

            //checking the token
            if(bToken != null || bToken.StartsWith("Bearer"))
            {
                //getting the token only
                string token = bToken.Substring("Bearer ".Length);

                //using firebase to verify token
                FirebaseToken firebaseToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

                return firebaseToken;


            }

            return null;
        }
    }



	
}

