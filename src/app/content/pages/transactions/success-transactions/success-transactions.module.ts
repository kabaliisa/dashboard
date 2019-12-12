import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessTransactionsRoutingModule } from './success-transactions-routing.module';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from 'src/app/content/rac/components/card/card.component';
import { ModalComponent } from '../../modal/modal.component';
import { SuccessTransactionsComponent } from './success-transactions.component';
import { CardModule } from 'src/app/core/components/card/card.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { ModalModule } from '../../modal/modal.module';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

@NgModule({
  declarations: [
    SuccessTransactionsComponent
  ],
  imports: [
    CommonModule,
    SuccessTransactionsRoutingModule,
    SubheaderModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ModalModule,
    AngularMyDatePickerModule
  ]
})
export class SuccessTransactionsModule { }
