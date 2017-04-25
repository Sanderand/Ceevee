import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DetailsComponent } from './details.component';

@NgModule({
    declarations: [
        DetailsComponent
    ],
    exports: [
        DetailsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ]
})
export class DetailsModule { }
