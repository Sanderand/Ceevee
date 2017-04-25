import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DividerComponent } from './divider.component';

@NgModule({
    declarations: [
        DividerComponent
    ],
    exports: [
        DividerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ]
})
export class DividerModule { }
