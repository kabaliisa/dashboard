import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FraudSearchRoutingModule } from './fraud-search-routing.module';
import { FraudSearchComponent } from './fraud-search.component';
import { ModalModule } from '../modal/modal.module';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';
import { CardModule } from 'src/app/core/components/card/card.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FraudSearchComponent
  ],
  imports: [
    NgbModule,
    SubheaderModule,
    CommonModule,
    FraudSearchRoutingModule,
    ModalModule,
    CardModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    InternationalPhoneNumberModule
  ]
})
export class FraudSearchModule { }
