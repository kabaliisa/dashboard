import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessTransactionsComponent } from './success-transactions.component';

const routes: Routes = [
  {path: '', component: SuccessTransactionsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessTransactionsRoutingModule { }
