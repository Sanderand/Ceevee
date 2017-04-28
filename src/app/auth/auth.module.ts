import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
        RouterModule
    ]
})
export class AuthModule { }
