import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingtransactionsComponent } from './pendingtransactions.component';

const routes: Routes = [
  {path: '', component: PendingtransactionsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingtransactionsRoutingModule { }
