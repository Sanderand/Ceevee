import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods, AngularFire } from 'angularfire2';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { ModalComponent } from './modal/modal.component';
import { AuthModule } from './auth/auth.module';

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
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    AuthModule
  ],
  providers: [
    DataService,
    AngularFire
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
