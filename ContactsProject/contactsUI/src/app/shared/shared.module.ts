import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';

@NgModule({
  declarations: [
    NavBarComponent,
    SingleContactComponent,
    AddContactDialogComponent,
    EditContactDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  exports:[
    NavBarComponent,
    SingleContactComponent
  ]
})
export class SharedModule { }
