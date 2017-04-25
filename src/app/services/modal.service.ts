import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ModalService {
    public open$: BehaviorSubject<any> = new BehaviorSubject(null);
    public close$: BehaviorSubject<any> = new BehaviorSubject(null);

    public openModal (options): void {
        this.open$.next(options);
    }

    public closeModal (res): void {
        this.close$.next(res);
    }
}