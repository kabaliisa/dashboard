import { ModalModule } from './../modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BureauApiRoutingModule } from './bureau-api-routing.module';
import { ModalComponent } from '../modal/modal.component';
import { BureauApiComponent } from './bureau-api.component';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/core/components/card/card.module';

@NgModule({
  declarations: [
    // ModalComponent,
    BureauApiComponent
  ],
  imports: [
    CommonModule,
    BureauApiRoutingModule,
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
  ]
})
export class BureauApiModule { }
