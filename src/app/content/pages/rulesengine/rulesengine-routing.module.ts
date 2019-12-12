import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RulesengineComponent } from './rulesengine.component';

const routes: Routes = [
  {path: '', component: RulesengineComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesengineRoutingModule { }
