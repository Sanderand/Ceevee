import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AngularFire } from 'angularfire2';

@Injectable()
export class CVService {
    public cv$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor (
        private _af: AngularFire,
        private _authService: AuthService
    ) {}

    public addCV (title: string): void {
        this.getCVList()
            .subscribe(list => list.push({
                title
            }));
    }

    public getCVList (): Observable<any> {
        return this._authService.user$
            .filter(user => !!user)
            .map(user => user.uid)
            .map(uid => this._af.database.list(`/cvs/${ uid }`));
    }

    public loadCV (id): Observable<any> {
        let cv = this.getCv(id);

        cv.subscribe(cv => {
            this.cv$.next(cv);
        });

        return cv;
    }

    public removeCV (id): void {
        this.getCv(id)
            .subscribe(cv => {
                cv.remove();
            });
    }

    private getCv (id: string): Observable<any> {
        return this._authService.user$
            .filter(user => !!user)
            .map(user => user.uid)
            .map(uid => this._af.database.object(`/cvs/${ uid }/${ id }`));
    }
}
