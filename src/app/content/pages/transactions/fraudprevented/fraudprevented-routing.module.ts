import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraudpreventedComponent } from './fraudprevented.component';

const routes: Routes = [
  {path: '', component: FraudpreventedComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraudpreventedRoutingModule { }
