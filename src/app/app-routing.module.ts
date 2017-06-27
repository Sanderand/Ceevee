import { RouterModule, Routes } from '@angular/router';

import { CVComponent } from './cv/cv.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const appRoutes: Routes = [{
	path: '',
	pathMatch: 'full',
	component: HomeComponent
}, {
	path: 'me',
	component: ProfileEditComponent
}, {
	path: 'cv/:id',
	component: CVComponent
}, {
	outlet: 'modal',
	path: 'data',
	component: ModalComponent
}, {
	path: '**',
	component: NotFoundComponent
}];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
