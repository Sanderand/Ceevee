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

    public getCVList (): Observable<any> {
        return this._authService.user$
            .filter(user => !!user)
            .map(user => user.uid)
            .map(uid => this._af.database.list(`/cvs/${ uid }`));
    }

    public loadCV (id): void {
        this.getCv(id)
            .subscribe(cv => {
                this.cv$.next(cv);
            });
    }

    private getCv (id: string): Observable<any> {
        return this._authService.user$
            .filter(user => !!user)
            .map(user => user.uid)
            .map(uid => this._af.database.list(`/cvs/${ uid }/${ id }`));
    }
}
