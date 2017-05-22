import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class CVService {
    constructor (
        private _af: AngularFire,
        private _authService: AuthService
    ) {}

    public addCV (title: string): void {
        this.getCvs()
            .first()
            .subscribe(list => list.push({
                title,
                _created: firebase.database.ServerValue.TIMESTAMP
            }));
    }

    public getCv (cid: string): Observable<any> {
        return this._authService.user$
          .filter(Boolean)
          .map(user => user.uid)
          .map(uid => this._af.database.object(`/cvs/${ uid }/${ cid }`));
    }

    public getCvSections (cid: string): Observable<any> {
      return this._authService.user$
          .filter(Boolean)
          .map(user => user.uid)
          .map(uid => this._af.database.list(`/sections/${ uid }/${ cid }`));
    }

    public getCvs (): Observable<any> {
        return this._authService.user$
            .filter(Boolean)
            .map(user => user.uid)
            .map(uid => this._af.database.list(`/cvs/${ uid }`));
    }

    public removeCV (cid: string): void {
      const uid = this._authService.user$.getValue().uid;
      // note: how to delete a cv
      // 1. remove section
      // 2. if successfull, remove cv meta data
      this._af.database.object(`/sections/${ uid }/${ cid }`).remove().then(() => {
          this._af.database.object(`/cvs/${ uid }/${ cid }`).remove();
      });
    }
}
