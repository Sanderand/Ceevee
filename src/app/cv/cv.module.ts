import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CVComponent } from './cv.component';

import { DetailsComponent } from './details/details.component';
import { DividerComponent } from './divider/divider.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        CVComponent,

        DetailsComponent,
        DividerComponent,
        ExperienceComponent,
        EducationComponent,
        SkillsComponent,
        FeedbackComponent
    ],
    exports: [
        CVComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterModule,
        SharedModule
    ]
})
export class CVModule { }
