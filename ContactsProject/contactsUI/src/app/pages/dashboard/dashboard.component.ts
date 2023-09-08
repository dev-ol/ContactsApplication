import { Component } from '@angular/core';
import { Contact } from 'src/models/Contact';
import { MatDialog } from '@angular/material/dialog';
import { AddContactDialogComponent } from 'src/app/shared/add-contact-dialog/add-contact-dialog.component';
import { ContactService } from 'src/services/contact/contact.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  contactList: Contact[];
  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.getContacts();
  }
  //opens contact modal to add a new contact
  openNewContactModal() {
    const dialogRef = this.dialog.open(AddContactDialogComponent, {
      maxWidth: '760px',
      panelClass: 'contact-dialog-panel',
      backdropClass: '',
      hasBackdrop: true,
    });

    let sub = dialogRef.afterClosed().subscribe((result) => {
     
      if (result) {
        this.addNewContact(result);
      }
      sub.unsubscribe();
    });
  }

  getContacts() {
    this.loading = true;
    this.contactService.getContacts().then((x) => {
      if (x) {
        this.contactList = x;
      }
      this.loading = false;
    });
  }

  addNewContact(newContact: Contact) {
   
    this.contactList.push(newContact);

    this.contactService.saveContact(newContact).then((x) => {
      this.getContacts();
    });
  }

  deleteContact(contact: Contact) {

    let index = this.contactList.findIndex((x) => x.id == contact.id);

    if (index > -1) {
      this.contactList.splice(index, 1);
      this.contactService.deleteContact(contact.id).then((x) => {
        this.getContacts();
      });
    }
  }
}
