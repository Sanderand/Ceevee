import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class CVService {
    public cv$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor (
        private _af: AngularFire,
        private _authService: AuthService
    ) {}

    public addCV (title: string): void {
        this.getCVList()
            .first()
            .subscribe(list => list.push({
                title,
                _created: firebase.database.ServerValue.TIMESTAMP
            }));
    }

    public getCVList (): Observable<any> {
        return this._authService.user$
            .filter(Boolean)
            .map(user => user.uid)
            .map(uid => this._af.database.list(`/cvs/${ uid }`));
    }

    public loadCV (id): void {
        this.getCv(id)
            .first()
            .subscribe(cv => {
                this.cv$.next(cv);
            });
    }

    public removeCV (id): void {
        this.getCv(id)
            .filter(Boolean)
            .first()
            .subscribe(cv => {
                cv.remove();
            });
    }

    private getCv (id: string): Observable<any> {
        return this._authService.user$
            .filter(Boolean)
            .map(user => user.uid)
            .map(uid => this._af.database.object(`/cvs/${ uid }/${ id }`));
    }
}
