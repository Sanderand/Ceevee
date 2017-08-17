import * as firebase from 'firebase';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/Operator/combineLatest';
import 'rxjs/add/Operator/distinctUntilChanged';
import 'rxjs/add/Operator/filter';
import 'rxjs/add/Operator/first';
import 'rxjs/add/Operator/switchMap';

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
			.switchMap(user => this._db.list(`/cvs/${ user.uid }`));
	}

	public getCv (cid: string): Observable<any> {
		return this._authService.user$
			.filter(user => user && user.uid)
			.distinctUntilChanged()
			.switchMap(user => this._db.object(`/cvs/${ user.uid }/${ cid }`));
	}

	public getCvSections (cid: string): Observable<any> {
		return this._authService.user$
			.filter(user => user && user.uid)
			.distinctUntilChanged()
			.switchMap(user => this._db.list(`/sections/${ user.uid }/${ cid }`));
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
			.combineLatest(this._db.list(`/sections/${ uid }/${ cid }`))
			.first()
			.subscribe(([cv, sections]) => {
				this._db.list(`/cvs/${ uid }`).push({
					title: `${ cv.title } Copy`,
					description: cv.description,
					_created: firebase.database.ServerValue.TIMESTAMP
				}).then(cvCopy => {
					sections.forEach(section => this.addCvSection(cvCopy.key, section));
				});
			});
	}

	private getUserId (): string {
		return this._authService.user$.getValue().uid;
	}
}
