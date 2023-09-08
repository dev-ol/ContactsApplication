import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/models/Contact';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.scss']
})
export class AddContactDialogComponent {

  newContactForm : FormGroup;

  constructor(public dialogRef:MatDialogRef<AddContactDialogComponent>) {
    
  }


  ngOnInit(){
    this.newContactForm = new FormGroup({
      firstname : new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastname : new FormControl('', [Validators.required, Validators.minLength(1)]),
      phoneNumber : new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }


  save(){
    if(this.newContactForm.valid){

      let contact  = new Contact();

      contact.firstname = this.newContactForm.controls["firstname"].value;
      contact.lastname = this.newContactForm.controls["lastname"].value;
      contact.phone = this.newContactForm.controls["phoneNumber"].value;
      
      this.dialogRef.close(contact);
    }
  }

  cancel(){
    this.dialogRef.close(undefined);
  }
  
}
