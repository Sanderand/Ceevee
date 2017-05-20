import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class CVService {
    public cv$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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

    public getCv (cid): Observable<any> {
        return this._authService.user$
          .filter(Boolean)
          .map(user => user.uid)
          .map(uid => this._af.database.object(`/cvs/${ uid }/${ cid }`));
    }

    public getCvSections (cid): Observable<any> {
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

    public removeCV (cid): void {
      let uid = this._authService.user$.getValue().uid;
      this._af.database.object(`/sections/${ uid }/${ cid }`).remove().then(() => {
          this._af.database.object(`/cvs/${ uid }/${ cid }`).remove();
      });
    }
}
