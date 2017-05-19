import { Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { FONT_SIZE_CHANGE_STEP, MAX_FONT_SIZE, MIN_FONT_SIZE } from '../shared/constants/constants';
import { restrictRange } from '../shared/helpers/math.helpers';
import { CVService } from './cv.service';
import { Observable } from 'rxjs';
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';
import { AuthService } from '../auth/auth.service';

const TYPES = [{
    name: 'Details',
    type: 'DETAILS'
}, {
    name: 'Divider',
    type: 'DIVIDER'
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
    styleUrls: ['./cv.component.scss'],
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

    public cv: FirebaseObjectObservable<any>;
    public uid: Observable<any>;
    public cid: Observable<any>;
    public sections: FirebaseListObservable<any>;
    public types = TYPES;
    public newSection = {
      title: null,
      type: null
    };

    public path: Observable<any>;
    private _theme: FirebaseObjectObservable<any>;

    constructor (
        private _authService: AuthService,
        private _cvService: CVService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    public ngOnInit (): void {
      this.uid = this._authService.user$.map(u => u.uid);

      this.cid = this._route.params
        .map(p => p.id)
        .filter(Boolean);

      this.cid
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

        this.resetForm();
    }

    public submitChanges (event): void {
      event.preventDefault();

      if (!this.newSection.type && !this.newSection.title) {
        return;
      }

      this.sections.push({
        data: {},
        meta: {
          type: this.newSection.type,
          title: this.newSection.title
        }
      });

      this.resetForm();
    }

    private resetForm (): void {
      this.newSection = {
        title: null,
        type: this.types[0].type
      };
    }

    public removeCV (): void {
        this._router.navigate(['/']).then(() => {
            this.cid
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
        // this._theme.update({
        //     fontSize: this.fontSize,
        //     fontFamily: this.fontFamily || null
        // });
    }

    public openDropdown ($event): void {
        $event.stopPropagation();
        this.dropdown.open = true;
    }
}
