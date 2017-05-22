import { Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFire } from 'angularfire2';

import { FONT_SIZE_CHANGE_STEP, MAX_FONT_SIZE, MIN_FONT_SIZE } from '../shared/constants/constants';
import { restrictRange } from '../shared/helpers/math.helpers';
import { CVService } from './cv.service';
import { Observable } from 'rxjs/Observable';
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';
import { generateUUID } from '../shared/helpers/math.helpers';
import * as firebase from 'firebase';

const TYPES = [{
    name: 'Header',
    type: 'HEADER'
}, {
    name: 'Title',
    type: 'TITLE'
}, {
    name: 'Text',
    type: 'TEXT'
}, {
    name: 'Education',
    type: 'EDUCATION'
}, {
    name: 'Experience',
    type: 'EXPERIENCE'
}, {
    name: 'Feedback',
    type: 'FEEDBACK'
}, {
    name: 'Skills',
    type: 'SKILLS'
}];

@Component({
    selector: 'cv-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.scss', './andre.theme.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CVComponent implements OnInit {
    @HostBinding('class.cv') true;
    public themeClass: string = '';
    public fontSize: number = 1;
    public fontFamily: string = null;

    @ViewChild('dropdown') public dropdown: DropdownComponent;

    public MIN_FONT_SIZE = MIN_FONT_SIZE;
    public MAX_FONT_SIZE = MAX_FONT_SIZE;
    public types = TYPES;
    public newSection: any;

    public cid: string;
    public uid$: Observable<any>;
    public cv$: FirebaseObjectObservable<any>;
    public sections$: FirebaseListObservable<any>;
    public basePath$: Observable<string>;


    private _theme: FirebaseObjectObservable<any>;
    private _uuid = generateUUID();

    constructor (
        private _af: AngularFire,
        private _authService: AuthService,
        private _cvService: CVService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _modalService: ModalService
    ) { }

    public ngOnInit (): void {
        this.cid = this._route.snapshot.params['id'];

        this.uid$ = this._authService.user$
            .filter(Boolean)
            .map(u => u.uid)
            .first();

        this.uid$
            .subscribe(uid => this.cv$ = this._af.database.object(`/cvs/${ uid }/${ this.cid }`));

        this._cvService.getCvSections(this.cid)
            .subscribe(sections => {
                this.sections$ = sections;
            });

        this.basePath$ = this.uid$
            .map(uid => `sections/${ uid }/${ this.cid }/`);

        this._modalService.close$
            .filter(res => !!res && res.source === this._uuid)
            .subscribe(this.onCvRenameModalClose);

        this.resetForm();
    }

    public submitChanges (event): void {
      event.preventDefault();

      if (!this.newSection.type) {
        return;
      }

      this.sections$.push({
        data: {},
        meta: {
          type: this.newSection.type,
          _created: firebase.database.ServerValue.TIMESTAMP
        }
      });

      this.resetForm();
    }

    private resetForm (): void {
      this.newSection = {
        title: null,
        type: null
      };
    }

    public removeCV ($event): void {
        this._router
            .navigate(['/'])
            .then(() => this._cvService.removeCV(this.cid));
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
        // this._theme.update({
        //     fontSize: this.fontSize,
        //     fontFamily: this.fontFamily || null
        // });
    }

    public openDropdown ($event): void {
        $event.stopPropagation();
        this.dropdown.open = true;
    }

    public renameCV ($event): void {
        $event.stopPropagation();
        this.dropdown.open = false;

        this.cv$
            .filter(Boolean)
            .first()
            .subscribe(this.openCvRenameModal);
    }

    private openCvRenameModal = (cv): void => {
        this._modalService
            .openModal({
                data: {
                    title: cv.title,
                    description: cv.description
                },
                fields: [{
                    key: 'title',
                    label: 'Title',
                    type: 'text',
                    placeholder: 'Title'
                }, {
                    key: 'description',
                    label: 'Description',
                    type: 'textarea',
                    placeholder: 'Description'
                }],
                source: this._uuid
            });
    };

    private onCvRenameModalClose = (res): void => {
        if (!(res.data && res.data.title && res.data.title.length)) {
            return;
        }

        this.cv$.update({
            title: res.data.title,
            description: res.data.description
        });
    };
}
