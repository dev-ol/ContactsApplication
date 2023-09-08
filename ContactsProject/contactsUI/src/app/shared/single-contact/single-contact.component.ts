import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/models/Contact';
import { EditContactDialogComponent } from '../edit-contact-dialog/edit-contact-dialog.component';
import { ContactService } from 'src/services/contact/contact.service';

@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss'],
})
export class SingleContactComponent {
  @Input()
  contact: Contact;

  @Output()
  deleteEmitter: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor(
    public dialog: MatDialog,
    private contactService: ContactService
  ) {}

  ngInit() {}

  edit() {
    this.openEditContactModal();
  }

  delete() {
    this.deleteEmitter.emit(this.contact);
  }

  openEditContactModal() {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      maxWidth: '760px',
      panelClass: 'contact-dialog-panel',
      backdropClass: '',
      hasBackdrop: true,
      data: {
        contact: this.contact,
      },
    });

    let sub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editContact(result);
      }
      sub.unsubscribe();
    });
  }

  editContact(newContact: Contact) {
    this.contact = newContact;

    this.contactService.editContact(newContact).then((x) => {});
  }
}
