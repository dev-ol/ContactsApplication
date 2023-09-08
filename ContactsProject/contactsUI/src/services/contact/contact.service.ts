import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from 'src/models/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient, public auth: Auth, private router : Router) {}

  //get contacts base on the login user
  async getContacts(): Promise<any> {
    let url = this.baseUrl + 'contacts';

    let options = {
      headers: await this.setAuthHeaders()
    };
    return lastValueFrom(this.http.get(url, options).pipe(catchError(error => this.handleError(error))));
  }

  //save a new contact
  async saveContact(contact: Contact): Promise<any> {
    let url = this.baseUrl + 'contacts';

    let options = {
      headers: await this.setAuthHeaders()
    };

    return lastValueFrom(this.http.post(url, contact, options).pipe(catchError(error => this.handleError(error))));
  }

  //edit an existing contacy
  async editContact(editedContact: Contact): Promise<any> {
    let url = this.baseUrl + 'contacts';

    let options = {
      headers: await this.setAuthHeaders()
    };

    return lastValueFrom(this.http.put(url, editedContact ,options).pipe(catchError(error => this.handleError(error))));
  }

  async deleteContact(contactId: string): Promise<any> {
    let url = this.baseUrl + 'contacts?contactId='+contactId;

    let options = {
      headers: await this.setAuthHeaders()
    };

    return lastValueFrom(this.http.delete(url, options).pipe(catchError(error => this.handleError(error))));
  }

//set appropiate headers
  async setAuthHeaders() : Promise<any>{
    let token = await this.auth.currentUser?.getIdToken();
   // console.log("user token : ", token )

    if(token == undefined){
      this.auth.signOut();
      this.router.navigateByUrl('/login');
        
    }
    let headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };


    return headers;

  }

  private handleError(error : Response | any){


    if(error instanceof Response){

      const body = error.json() || '';

      var err = "";

      body.then(er=> {
        err = er.error || JSON.stringify(body);
      });
      alert(err || "Something went wrong. Please try again later");
    }else{
      alert(error._error || error.message || "Something went wrong. Please try again later");
    }

    return throwError(() => new Error(error));
  }
}
