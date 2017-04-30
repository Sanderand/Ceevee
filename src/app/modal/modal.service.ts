import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class ModalService {
    public open$: BehaviorSubject<any> = new BehaviorSubject(null);
    public close$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor (
        private _location: Location,
        private _router: Router
    ) {}

    public openModal (options): void {
        this._router.navigate(['.', { outlets: { modal: 'data' }}])
            .then(() => this.open$.next(options))
            .catch(err => console.error('openModal', err));
    }

    public closeModal (res): void {
        this._location.back();
        this.close$.next(res);
    }
}
