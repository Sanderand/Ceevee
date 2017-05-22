import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ModalModule } from '../modal/modal.module';

import { CVComponent } from './cv.component';

import { HeaderComponent } from './items/header/header.component';
import { TitleComponent } from './items/title/title.component';
import { TextComponent } from './items/text/text.component';

import { ExperienceComponent } from './lists/experience/experience.component';
import { EducationComponent } from './lists/education/education.component';
import { SkillsComponent } from './lists/skills/skills.component';
import { FeedbackComponent } from './lists/feedback/feedback.component';


@NgModule({
    declarations: [
        CVComponent,

        HeaderComponent,
        TitleComponent,
        TextComponent,

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
        SharedModule,
        ModalModule
    ]
})
export class CVModule { }
