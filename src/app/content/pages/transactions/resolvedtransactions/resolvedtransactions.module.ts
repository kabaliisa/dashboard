import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResolvedtransactionsRoutingModule } from './resolvedtransactions-routing.module';
import { CardComponent } from 'src/app/content/rac/components/card/card.component';
import { ModalComponent } from '../../modal/modal.component';
import { ResolvedtransactionsComponent } from './resolvedtransactions.component';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/core/components/card/card.module';
import { ModalModule } from '../../modal/modal.module';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

@NgModule({
  declarations: [
    // ModalComponent,
    ResolvedtransactionsComponent
  ],
  imports: [
    CommonModule,
    ResolvedtransactionsRoutingModule,
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
export class ResolvedtransactionsModule { }
