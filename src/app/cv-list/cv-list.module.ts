import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CVListComponent } from './cv-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CVListComponent
    ],
    exports: [
        CVListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class CVListModule { }
