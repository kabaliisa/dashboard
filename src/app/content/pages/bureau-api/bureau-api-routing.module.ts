import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BureauApiComponent } from './bureau-api.component';

const routes: Routes = [
  {path: '', component: BureauApiComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BureauApiRoutingModule { }
