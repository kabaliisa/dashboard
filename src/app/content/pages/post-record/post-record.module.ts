import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRecordRoutingModule } from './post-record-routing.module';
import { PostRecordComponent } from './post-record.component';
import { ModalModule } from '../modal/modal.module';
import { CardModule } from 'src/app/core/components/card/card.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';

@NgModule({
  declarations: [
    PostRecordComponent
  ],
  imports: [
    SubheaderModule,
    CommonModule,
    PostRecordRoutingModule,
    ModalModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    InternationalPhoneNumberModule,
    AngularMyDatePickerModule,
    NgbModule
  ]
})
export class PostRecordModule { }
