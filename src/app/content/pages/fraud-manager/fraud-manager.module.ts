import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FraudManagerRoutingModule } from './fraud-manager-routing.module';
import { CardComponent } from '../../rac/components/card/card.component';
import { ModalComponent } from '../modal/modal.component';
import { FraudManagerComponent } from './fraud-manager.component';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/core/components/card/card.module';
import { ModalModule } from '../modal/modal.module';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

@NgModule({
  declarations: [
    FraudManagerComponent
  ],
  imports: [
    CommonModule,
    FraudManagerRoutingModule,
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
export class FraudManagerModule { }
