import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { AuthService } from '../auth/auth.service';
import { firebaseListMap, firebaseObjectMap } from '../shared/helpers/firebase.helpers';

@Injectable()
export class CVService {
	constructor (
		private _db: AngularFireDatabase,
		private _authService: AuthService
	) {}

	public getCvs (): Observable<any> {
		return this._authService.user$
			.filter(user => user && user.uid)
			.distinctUntilChanged()
			.switchMap(user => this._db.list(`/cvs/${ user.uid }`).snapshotChanges())
			.map(firebaseListMap);
	}

	public getCv (cid: string): Observable<any> {
		return this._authService.user$
			.filter(user => user && user.uid)
			.distinctUntilChanged()
			.switchMap(user => this._db.object(`/cvs/${ user.uid }/${ cid }`).snapshotChanges())
			.map(firebaseObjectMap);
	}

	public getCvSections (cid: string): Observable<any> {
		return this._authService.user$
			.filter(user => user && user.uid)
			.distinctUntilChanged()
			.switchMap(user => this._db.list(`/sections/${ user.uid }/${ cid }`).snapshotChanges())
			.map(firebaseListMap);
	}

	public addCV (title: string): void {
		const uid = this.getUserId();
		this._db.list(`/cvs/${ uid }`).push({
			title,
			_created: firebase.database.ServerValue.TIMESTAMP
		});
	}

	public updateCVFontFamily (cid: string, fontFamily: string): void {
		const uid = this.getUserId();

		if (!fontFamily || fontFamily === 'null') {
			this._db
				.object(`/cvs/${ uid }/${ cid }/fontFamily`)
				.remove();
		} else {
			this._db
				.object(`/cvs/${ uid }/${ cid }`)
				.update({
					fontFamily
				});
		}
	}

	public updateCVFontSize (cid: string, fontSize: number): void {
		const uid = this.getUserId();

		this._db
			.object(`/cvs/${ uid }/${ cid }`)
			.update({
				fontSize
			});
	}

	public addCvSection (cid: string, section: any): void {
		const uid = this.getUserId();
		this._db.list(`/sections/${ uid }/${ cid }`).push(section);
	}

	public renameCv (cid: string, data: { title: string, description: string }): void {
		const uid = this.getUserId();
		this._db.object(`/cvs/${ uid }/${ cid }`).update(data);
	}

	public removeCV (cid: string): void {
		const uid = this.getUserId();
		// note: how to delete a cv
		// 1. remove section
		// 2. if successfull, remove cv meta data
		this._db.object(`/sections/${ uid }/${ cid }`).remove().then(() => {
			this._db.object(`/cvs/${ uid }/${ cid }`).remove();
		});
	}

	public duplicateCV (cid: string): void {
		const uid = this.getUserId();

		this._db.object(`/cvs/${ uid }/${ cid }`)
			.valueChanges()
			.combineLatest(this._db.list(`/sections/${ uid }/${ cid }`).valueChanges())
			.first()
			.subscribe(([cv, sections]) => {
				const cvData = {
					title: `${ (<any>cv).title } Copy`,
					description: (<any>cv).description,
					_created: firebase.database.ServerValue.TIMESTAMP
				};

				this._db.list(`/cvs/${ uid }`).push(cvData).then(cvCopy => {
					sections.forEach(section => this.addCvSection(cvCopy.key, section));
				});
			});
	}

	private getUserId (): string {
		return this._authService.user$.getValue().uid;
	}
}
