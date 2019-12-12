import { CardModule } from 'src/app/core/components/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchProfileRoutingModule } from './search-profile-routing.module';
import { SearchProfileComponent } from './search-profile.component';
import { ModalModule } from '../modal/modal.module';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SearchProfileComponent
  ],
  imports: [
    SubheaderModule,
    NgbModule,
    CommonModule,
    SearchProfileRoutingModule,
    ModalModule,
    CardModule
  ]
})
export class SearchProfileModule { }
