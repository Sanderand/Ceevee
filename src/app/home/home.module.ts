import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		HomeComponent,
		DashboardComponent,
		LandingComponent
	],
	exports: [
		HomeComponent,
		DashboardComponent,
		LandingComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		SharedModule
	]
})
export class HomeModule { }
