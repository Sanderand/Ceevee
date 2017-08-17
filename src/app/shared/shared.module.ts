import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TextAreaDirective } from './directives/text-area/text-area.directive';
import { SplitPipe } from './pipes/split.pipe';
import { WhenPipe } from './pipes/when.pipe';
import { CVListComponent } from './components/cv-list/cv-list.component';

@NgModule({
	declarations: [
		SpinnerComponent,
		DropdownComponent,
		TextAreaDirective,

		CVListComponent,

		SplitPipe,
		WhenPipe
	],
	exports: [
		SpinnerComponent,
		DropdownComponent,
		TextAreaDirective,

		CVListComponent,

		SplitPipe,
		WhenPipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		RouterModule
	]
})
export class SharedModule { }
