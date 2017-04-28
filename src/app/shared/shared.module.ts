import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    exports: [
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
