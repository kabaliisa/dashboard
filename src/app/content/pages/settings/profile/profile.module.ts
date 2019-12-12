import { CardModule } from './../../../../core/components/card/card.module';
import { ModalModule } from './../../modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule, MatIconModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ModalModule,
    CardModule,
    SubheaderModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    InternationalPhoneNumberModule,
    MatIconModule
  ]
})

export class ProfileModule { }
