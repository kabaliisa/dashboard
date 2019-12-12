import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetrulesComponent } from './setrules.component';

const routes: Routes = [
  {path: '', component: SetrulesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetrulesRoutingModule { }
