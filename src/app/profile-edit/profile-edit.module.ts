import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileEditComponent } from './profile-edit.component';

@NgModule({
    declarations: [
        ProfileEditComponent
    ],
    exports: [
        ProfileEditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class ProfileEditModule { }
