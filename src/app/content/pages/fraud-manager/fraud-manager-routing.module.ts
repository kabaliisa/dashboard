import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraudManagerComponent } from './fraud-manager.component';

const routes: Routes = [
  {path: '', component: FraudManagerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraudManagerRoutingModule { }
