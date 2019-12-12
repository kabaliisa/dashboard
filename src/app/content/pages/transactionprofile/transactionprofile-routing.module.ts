import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionprofileComponent } from './transactionprofile.component';

const routes: Routes = [
  {path: '', component: TransactionprofileComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionprofileRoutingModule { }
