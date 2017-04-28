import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule, AuthProviders, AuthMethods, AngularFire } from 'angularfire2';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ModalModule } from './modal/modal.module';
import { CVModule } from './cv/cv.module';
import { HomeModule } from './home/home.module';
import { NotFoundModule } from './not-found/not-found.module';

import { ModalService } from './modal/modal.service';
import { AuthService } from './auth/auth.service';
import { CVService } from './cv/cv.service';
import { CVSelectModule } from './cv-select/cv-select.module';
import { CVListModule } from './cv-list/cv-list.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileEditModule } from './profile-edit/profile-edit.module';

export const firebaseConfig = {
    apiKey: 'AIzaSyAj2R8sLxgNVaSIHMcLnXKzTSoj5ACeZEg',
    authDomain: 'ceevee-9a7a5.firebaseapp.com',
    databaseURL: 'https://ceevee-9a7a5.firebaseio.com',
    projectId: 'ceevee-9a7a5',
    storageBucket: 'ceevee-9a7a5.appspot.com',
    messagingSenderId: '634507029561'
};

const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),

        AppRoutingModule,
        AuthModule,
        ModalModule,
        CVModule,
        HomeModule,
        DashboardModule,
        NotFoundModule,
        ProfileEditModule
    ],
    providers: [
        AngularFire,

        ModalService,
        AuthService,
        CVService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
