import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { ChartsModule } from 'ng2-charts';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalComponent } from '../modal/modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/core/components/card/card.module';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  declarations: [
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    ChartsModule,
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
export class SummaryModule { }
