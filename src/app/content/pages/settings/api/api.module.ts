import { CardModule } from 'src/app/core/components/card/card.module';
import { ModalModule } from './../../modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRoutingModule } from './api-routing.module';
import { ApiComponent } from './api.component';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { MatTableModule, MatTabsModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

@NgModule({
  declarations: [
    ApiComponent
  ],
  imports: [
    CommonModule,
    ApiRoutingModule,
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
    AngularMyDatePickerModule
  ]
})
export class ApiModule { }
