import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { CVListModule } from '../cv-list/cv-list.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        CVListModule,
        RouterModule
    ]
})
export class DashboardModule { }
