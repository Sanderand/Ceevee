import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SplitPipe } from './pipes/split.pipe';
import { WhenPipe } from './pipes/when.pipe';
import { CVListComponent } from './components/cv-list/cv-list.component';
import { CVSelectComponent } from './components/cv-select/cv-select.component';

@NgModule({
    declarations: [
        SpinnerComponent,
        DropdownComponent,

        CVListComponent,
        CVSelectComponent,

        SplitPipe,
        WhenPipe
    ],
    exports: [
        SpinnerComponent,
        DropdownComponent,

        CVListComponent,
        CVSelectComponent,

        SplitPipe,
        WhenPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
