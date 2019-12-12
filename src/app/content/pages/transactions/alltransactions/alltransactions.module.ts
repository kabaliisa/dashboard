import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlltransactionsRoutingModule } from './alltransactions-routing.module';
import { ModalComponent } from '../../modal/modal.component';
import { AlltransactionsComponent } from './alltransactions.component';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/core/components/card/card.module';
import { ModalModule } from '../../modal/modal.module';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

@NgModule({
  declarations: [
    AlltransactionsComponent
  ],
  imports: [
    CommonModule,
    AlltransactionsRoutingModule,
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
export class AlltransactionsModule { }
