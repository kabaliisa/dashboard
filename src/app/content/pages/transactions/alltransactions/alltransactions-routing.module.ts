import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlltransactionsComponent } from './alltransactions.component';

const routes: Routes = [
  {path: '', component: AlltransactionsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlltransactionsRoutingModule { }
