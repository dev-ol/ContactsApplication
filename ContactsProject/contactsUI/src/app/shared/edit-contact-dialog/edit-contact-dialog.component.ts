import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/models/Contact';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./edit-contact-dialog.component.scss']
})
export class EditContactDialogComponent {

  editContactForm : FormGroup;

  constructor(public dialogRef:MatDialogRef<EditContactDialogComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data : {contact : Contact}) {
    
  }


  ngOnInit(){

    
    let editableContact = this.data.contact;

    this.editContactForm = new FormGroup({
      firstname : new FormControl(editableContact.firstname, [Validators.required, Validators.minLength(1)]),
      lastname : new FormControl(editableContact.lastname, [Validators.required, Validators.minLength(1)]),
      phoneNumber : new FormControl(editableContact.phone, [Validators.required, Validators.minLength(7)])
    });
  }


  save(){
    
    if(this.editContactForm.valid && this.editContactForm.touched){

      let contact  = new Contact();
      contact.id = this.data.contact.id;
      contact.ownerId = this.data.contact.ownerId;
      contact.firstname = this.editContactForm.controls["firstname"].value;
      contact.lastname = this.editContactForm.controls["lastname"].value;
      contact.phone = this.editContactForm.controls["phoneNumber"].value;
      
     this.dialogRef.close(contact);
    }else{
      this.cancel();
    }

  }

  cancel(){
    this.dialogRef.close(undefined);
  }
}
