import * as firebase from 'firebase';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CVService {
    constructor (
        private _af: AngularFire,
        private _authService: AuthService
    ) {}

    public getCvs (): FirebaseListObservable<any> {
        return this._authService.user$
            .filter(user => user && user.uid)
            .map(user => this._af.database.list(`/cvs/${ user.uid }`))
            .distinctUntilChanged()
            .mergeAll();
    }

    public getCv (cid: string): FirebaseObjectObservable<any> {
        return this._authService.user$
            .filter(user => user && user.uid)
            .map(user => this._af.database.object(`/cvs/${ user.uid }/${ cid }`))
            .distinctUntilChanged()
            .mergeAll();
    }

    public getCvSections (cid: string): FirebaseListObservable<any> {
        return this._authService.user$
            .filter(user => user && user.uid)
            .map(user => this._af.database.list(`/sections/${ user.uid }/${ cid }`))
            .distinctUntilChanged()
            .mergeAll();
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
        debugger;
    }

    private getUserId (): string {
        return this._authService.user$.getValue().uid;
    }
}
