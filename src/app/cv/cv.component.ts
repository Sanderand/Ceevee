import { Component, ViewEncapsulation, HostBinding, OnInit } from '@angular/core';
import { AngularFire, AngularFireAuth, FirebaseListObservable } from 'angularfire2';

import { ModalService } from '../modal/modal.service';
import { Field } from '../models/field.model';
import { DetailsFields } from '../models/details.model';

import { MIN_FONT_SIZE, MAX_FONT_SIZE, FONT_SIZE_CHANGE_STEP } from '../constants/constants';
import { restrictRange } from '../helpers/math.helpers';
import { CVService } from './cv.service';

@Component({
    selector: 'cv-cv',
    templateUrl: 'cv.component.html',
    styleUrls: ['cv.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CVComponent implements OnInit {
    @HostBinding('class') public hostClasses: string = 'cv';
    @HostBinding('style.fontSize.em') public fontSize: number = null;
    @HostBinding('style.fontFamily') public fontFamily: string = null;

    public MIN_FONT_SIZE = MIN_FONT_SIZE;
    public MAX_FONT_SIZE = MAX_FONT_SIZE;

    public theme: any = null;
    public auth: AngularFireAuth = null;

    constructor (
        private _af: AngularFire,
        private _cvService: CVService
    ) { }

    public ngOnInit (): void {
        this.auth = this._af.auth;
        this.theme = this._af.database.object('/cvs/one/theme');
        this.theme
            .subscribe(theme => {
                this.fontSize = theme.fontSize || 1;
                this.fontFamily = theme.fontFamily || null;
                this.hostClasses = `cv ${theme.class}`;
            });
    }

    public decreaseFontSize (): void {
        this.fontSize = restrictRange(this.fontSize - FONT_SIZE_CHANGE_STEP, MIN_FONT_SIZE, MAX_FONT_SIZE);
        this.updateTheme();
    }

    public increaseFontSize (): void {
        this.fontSize = restrictRange(this.fontSize + FONT_SIZE_CHANGE_STEP, MIN_FONT_SIZE, MAX_FONT_SIZE);
        this.updateTheme();
    }

    public changeFontFamily ($event): void {
        this.fontFamily = $event.target.value || null;
        this.updateTheme();
    }

    private updateTheme (): void {
        this.theme.update({
            fontSize: this.fontSize,
            fontFamily: this.fontFamily
        });
    }
}
