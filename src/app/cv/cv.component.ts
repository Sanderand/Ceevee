import { Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { FONT_SIZE_CHANGE_STEP, MAX_FONT_SIZE, MIN_FONT_SIZE } from '../shared/constants/constants';
import { restrictRange } from '../shared/helpers/math.helpers';
import { CVService } from './cv.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';

@Component({
    selector: 'cv-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CVComponent implements OnInit {
    @HostBinding('class') public hostClass: string = null;
    @HostBinding('style.fontSize.em') public fontSize: number = null;
    @HostBinding('style.fontFamily') public fontFamily: string = null;

    @ViewChild('dropdown') public dropdown: DropdownComponent;

    public MIN_FONT_SIZE = MIN_FONT_SIZE;
    public MAX_FONT_SIZE = MAX_FONT_SIZE;

    public cv: FirebaseObjectObservable<any>;
    public sections: FirebaseListObservable<any>;
    public newSectionName: any;

    public cvId: Observable<any>;
    public path: Observable<any>;
    private _theme: FirebaseObjectObservable<any>;

    constructor (
        private _af: AngularFire,
        private _authService: AuthService,
        private _cvService: CVService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    public ngOnInit (): void {
      this._route.params
        .map(p => p.id)
        .filter(Boolean)
        .subscribe(cid => {
            this._cvService.getCv(cid)
              .subscribe(cv => {
                this.cv = cv;
              });

            this._cvService.getCvSections(cid)
              .subscribe(sections => {
                this.sections = sections;
              });
        });











        /*
        this._route.params
            .map(p => p.id)
            .filter(Boolean)
            .subscribe(id => this._cvService.loadCV(id));

        this._cvService.cv$
            .filter(Boolean)
            .subscribe(cv => {
                cv.subscribe(cvData => {
                    if (!cvData.$exists()) {
                        this._router.navigate(['/']);
                    }
                });

                this.cv = cv;
            });

        let userId = this._authService.user$
            .filter(Boolean)
            .map(user => user.uid);

        this.cvId = this._cvService.cv$
            .filter(Boolean)
            .mergeAll()
            .map(cv => cv.$key);

        this.path = Observable.zip(userId, this.cvId)
            .map(res => `/cvs/${ res[0] }/${ res[1] }`);

        this.path.subscribe(path => {
            this._theme = this._af.database.object(`${ path }/theme`);
            this._theme
                .subscribe(theme => {
                    theme = theme || {};
                    this.fontSize = theme.fontSize || 1;
                    this.fontFamily = theme.fontFamily || null;
                    this.hostClass = theme.class || null;
                });
        })
        */
    }

    public submitChanges (event): void {
      event.preventDefault();


    }

    public removeCV (): void {
        this._router.navigate(['/']).then(() => {
            this.cvId
                .first()
                .subscribe(id => this._cvService.removeCV(id));
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
        this._theme.update({
            fontSize: this.fontSize,
            fontFamily: this.fontFamily || null
        });
    }

    public openDropdown ($event): void {
        $event.stopPropagation();
        this.dropdown.open = true;
    }
}
