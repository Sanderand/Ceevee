import * as firebase from 'firebase';

import { AngularFire } from 'angularfire2';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CVService {
    constructor (
        private _af: AngularFire,
        private _authService: AuthService
    ) {}

    public getCvs (): Observable<any> {
        return this._authService.user$
          .filter(user => user && user.uid)
          .distinctUntilChanged()
          .switchMap(user => this._af.database.list(`/cvs/${ user.uid }`));
    }

    public getCv (cid: string): Observable<any> {
        return this._authService.user$
          .filter(user => user && user.uid)
          .distinctUntilChanged()
          .switchMap(user => this._af.database.list(`/cvs/${ user.uid }/${ cid }`));
    }

    public getCvSections (cid: string): Observable<any> {
        return this._authService.user$
          .filter(user => user && user.uid)
          .distinctUntilChanged()
          .switchMap(user => this._af.database.list(`/sections/${ user.uid }/${ cid }`));
    }

    public addCV (title: string): void {
        const uid = this.getUserId();
        this._af.database.list(`/cvs/${ uid }`).push({
            title,
            _created: firebase.database.ServerValue.TIMESTAMP
        });
    }

    public addCvSection (cid: string, section: any): void {
        const uid = this.getUserId();
        this._af.database.list(`/sections/${ uid }/${ cid }`).push(section);
    }

    public renameCv (cid: string, data: { title: string, description: string }): void {
        const uid = this.getUserId();
        this._af.database.object(`/cvs/${ uid }/${ cid }`).update(data);
    }

    public removeCV (cid: string): void {
        const uid = this.getUserId();
        // note: how to delete a cv
        // 1. remove section
        // 2. if successfull, remove cv meta data
        this._af.database.object(`/sections/${ uid }/${ cid }`).remove().then(() => {
            this._af.database.object(`/cvs/${ uid }/${ cid }`).remove();
        });
    }

    public duplicateCV (cid: string): void {
        const uid = this.getUserId();
        this._af.database.object(`/cvs/${ uid }/${ cid }`)
            .combineLatest(this._af.database.list(`/sections/${ uid }/${ cid }`))
            .first()
            .subscribe(([cv, sections]) => {
                this._af.database.list(`/cvs/${ uid }`).push({
                    title: `${ cv.title } Copy`,
                    description: cv.description,
                    _created: firebase.database.ServerValue.TIMESTAMP
                }).then(cvCopy => {
                    sections.forEach(section => this.addCvSection(cvCopy.key, section));
                });
            });
    }

    private getUserId (): string {
        return this._authService.user$.getValue().uid;
    }
}
