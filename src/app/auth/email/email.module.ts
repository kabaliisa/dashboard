import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmailModule { }
