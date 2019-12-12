import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolvedtransactionsComponent } from './resolvedtransactions.component';

const routes: Routes = [
  {path: '', component: ResolvedtransactionsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolvedtransactionsRoutingModule { }
