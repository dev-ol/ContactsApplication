import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { ContactService } from 'src/services/contact/contact.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/services/auth/auth.service';


@NgModule({
  declarations: [
    DashboardComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],

  providers:[
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue :{hasBackdrop: true}},
    ContactService,
    AuthService
  ]
})
export class PagesModule { }
