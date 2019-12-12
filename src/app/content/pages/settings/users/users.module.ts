import { CardModule } from './../../../../core/components/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule, MatIconModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/content/rac/components/card/card.component';
import { ModalComponent } from '../../modal/modal.component';
import { UsersComponent } from './users.component';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { ModalModule } from '../../modal/modal.module';

@NgModule({
  declarations: [

    UsersComponent

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SubheaderModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    InternationalPhoneNumberModule,
    ModalModule,
    CardModule,
    MatIconModule
  ]
})
export class UsersModule { }
