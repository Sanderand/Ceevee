import { Component, ViewEncapsulation, HostBinding, OnInit } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';

import { MIN_FONT_SIZE, MAX_FONT_SIZE, FONT_SIZE_CHANGE_STEP } from '../constants/constants';
import { restrictRange } from '../helpers/math.helpers';
import { CVService } from './cv.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

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

    public cv: FirebaseObjectObservable<any>;
    public path: Observable<any>;
    private _theme: FirebaseObjectObservable<any>;

    constructor (
        private _af: AngularFire,
        private _authService: AuthService,
        private _cvService: CVService,
        private _route: ActivatedRoute
    ) { }

    public ngOnInit (): void {
        this._route.params
            .map(p => p.id)
            .filter(id => !!id)
            .subscribe(id => this._cvService.loadCV(id));

          this._cvService.cv$
              .subscribe(cv => {
                  this.cv = cv;
              });

        let cvId = this._cvService.cv$
            .filter(cv => !!cv)
            .mergeAll()
            .map(cv => cv.$key);

        let userId = this._authService.user$
            .filter(user => !!user)
            .map(user => user.uid);

        this.path = Observable.zip(userId, cvId)
            .map(res => `/cvs/${ res[0] }/${ res[1] }`);

        this.path.subscribe(path => {
            this._theme = this._af.database.object(`${ path }/theme`);
            this._theme
                .subscribe(theme => {
                    theme = theme || {};
                    this.fontSize = theme.fontSize || 1;
                    this.fontFamily = theme.fontFamily || null;
                    this.hostClasses = `cv ${theme.class || ''}`;
                });
        })
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
        this._theme.update({
            fontSize: this.fontSize,
            fontFamily: this.fontFamily || null
        });
    }
}