import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionprofileRoutingModule } from './transactionprofile-routing.module';
import { CardComponent } from '../../rac/components/card/card.component';
import { ModalComponent } from '../modal/modal.component';
import { TransactionprofileComponent } from './transactionprofile.component';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/core/components/card/card.module';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  declarations: [
    TransactionprofileComponent
  ],
  imports: [
    CommonModule,
    TransactionprofileRoutingModule,
    SubheaderModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ModalModule
  ]
})
export class TransactionprofileModule { }
