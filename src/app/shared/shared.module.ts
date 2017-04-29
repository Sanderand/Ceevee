import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './spinner/spinner.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SplitPipe } from './pipes/split.pipe';
import { WhenPipe } from './pipes/when.pipe';

@NgModule({
    declarations: [
        SpinnerComponent,
        DropdownComponent,

        SplitPipe,
        WhenPipe
    ],
    exports: [
        SpinnerComponent,
        DropdownComponent,
  
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
