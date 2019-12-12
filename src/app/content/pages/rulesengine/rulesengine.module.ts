import { CardModule } from 'src/app/core/components/card/card.module';
import { ModalModule } from './../modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesengineRoutingModule } from './rulesengine-routing.module';
import { RulesengineComponent } from './rulesengine.component';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  declarations: [
    RulesengineComponent
  ],
  imports: [
    CommonModule,
    RulesengineRoutingModule,
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
export class RulesengineModule { }
