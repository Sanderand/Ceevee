import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CVComponent } from './cv.component';
import { SplitPipe } from '../pipes/split.pipe';

import { DetailsComponent } from './details/details.component';
import { DividerComponent } from './divider/divider.component';
import { ExperienceComponent } from './experience/experience.component';

@NgModule({
    declarations: [
        CVComponent,
        SplitPipe,

        DetailsComponent,
        DividerComponent,
        ExperienceComponent
    ],
    exports: [
        CVComponent,
        SplitPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ]
})
export class CVModule { }
