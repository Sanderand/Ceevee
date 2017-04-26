import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire, AngularFireAuth, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';

@Component({
    selector: 'cv-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
    public auth: AngularFireAuth = null;
    public cvs: FirebaseListObservable<any> = null;

    constructor (
        private _af: AngularFire
    ) {}

    public ngOnInit (): void {
        this.auth = this._af.auth;
        this.cvs = this._af.database.list('/cvs');

        this.auth
            .filter(auth => !!auth)
            .map(auth => auth.uid)
            .subscribe(uid => {
                this._af.database
                    .list(`/users/${ uid }`)
                    .map(ids => ids.map(i => i.$key))
                    .subscribe(cvIds => {
                        cvIds.forEach(id => {
                            this._af.database
                                .object(`/cvs/${ id }`)
                                .subscribe(cv => {
                                    console.log(cv);
                                });
                        });
                    });
            });

        let uid = this.auth
            .filter(auth => !!auth)
            .map(auth => auth.uid);

        let ids = uid
            .map(uid => this._af.database.list(`/users/${ uid }`))
            .mergeAll()
            .map(ids => ids.map(i => i.$key));

        ids.subscribe(i => console.log(i));

            // .map(id => this._af.database.object(`/cvs/${ id }`))
    }

    public login() {
        this._af.auth.login();
    }

    public logout() {
        this._af.auth.logout();
    }
}
