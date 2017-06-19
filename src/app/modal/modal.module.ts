import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ModalComponent } from './modal.component';

@NgModule({
	declarations: [
		ModalComponent
	],
	exports: [
		ModalComponent
	],
	imports: [
		SharedModule,
		BrowserModule,
		FormsModule,
		CommonModule
	]
})
export class ModalModule { }
