import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraudSearchComponent } from './fraud-search.component';

const routes: Routes = [

  {path: '', component: FraudSearchComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraudSearchRoutingModule { }
