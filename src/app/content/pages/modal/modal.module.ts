import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalComponent
  ],
  exports: [ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]

})
export class ModalModule { }
