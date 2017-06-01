import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { Field } from '../../shared/models/field.model';
import { ModalService } from '../../modal/modal.service';
import { Subject } from 'rxjs/Subject';
import { generateUUID } from '../../shared/helpers/math.helpers';

export class FBList implements OnInit, OnChanges, OnDestroy {
    @Input() public section: any;
    @Input() public path: string;

    public items$: FirebaseListObservable<any>;

    private _uuid = generateUUID();
    private _keyInModal: string;

    protected _destroyed$: Subject<any> = new Subject<any>();
    protected _fields: Array<Field>;

    constructor (
        private _af: AngularFire,
        private _modalService: ModalService
    ) {}

    public ngOnInit (): void {
        this._modalService.close$
            .takeUntil(this._destroyed$)
            .filter(res => !!res && res.source === this._uuid)
            .subscribe(res => this.onModalClosed(res.data));
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const { path } = changes;

        if (path && path.currentValue) {
            this.items$ = this._af.database.list(`${ this.path }/data`);
        }
    }

    public ngOnDestroy (): void {
        this._destroyed$.next();
    }

    public editData ($event, item): void {
        $event.preventDefault();

        this._modalService
            .openModal({
                data: item ? Object.assign({}, item) : null,
                fields: this._fields.map(a => Object.assign({}, a)),
                preventDelete: false,
                source: this._uuid
            });

      this._keyInModal = item ? item.$key : null;
    }

    public onModalClosed (data): void {
        if (data) {
            if (this._keyInModal) {
                this.items$.update(this._keyInModal, data);
            } else {
                this.items$.push(data);
            }
        } else {
            if (this._keyInModal) {
                this.items$.remove(this._keyInModal);
            } else {
                // NOTE: A new item got cancelled: do nothing
            }
        }

        this._keyInModal = null;
    }

    public removeSection ($event: Event): void {
        if (!this.path) {
            return;
        }

        this._af.database.object(this.path).remove();
    }

    public isEmptyItem (item): boolean {
        // todo: find a more performant way to do this
        return Object
            .keys(item)
            .every(key => {
                const value = item[key];
                return !(value && value.length);
            });
    }
}
