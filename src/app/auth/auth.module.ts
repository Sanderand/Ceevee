import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthTileComponent } from './auth-tile.component';

@NgModule({
	declarations: [
		AuthTileComponent
	],
	exports: [
		AuthTileComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		RouterModule,

		AngularFireDatabaseModule,
		AngularFireAuthModule,

		SharedModule
	]
})
export class AuthModule { }
