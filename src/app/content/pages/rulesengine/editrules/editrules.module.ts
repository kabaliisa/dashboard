import { CardModule } from './../../../../core/components/card/card.module';
import { ModalModule } from './../../modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditrulesRoutingModule } from './editrules-routing.module';
import { EditrulesComponent } from './editrules.component';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    EditrulesComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    EditrulesRoutingModule,
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
  ]
})
export class EditrulesModule { }
