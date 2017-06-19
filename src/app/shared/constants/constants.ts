import { AuthMethods, AuthProviders } from 'angularfire2';

export const MIN_FONT_SIZE: number = 0.8;
export const MAX_FONT_SIZE: number = 1.4;
export const FONT_SIZE_CHANGE_STEP: number = 0.05;
export const PHOTO_PLACEHOLDER_URL = 'https://firebasestorage.googleapis.com/v0/b/ceevee-9a7a5.appspot.com/o/photo-placeholder.png?alt=media&token=69213439-53f7-4b70-9544-f484bbce9bba';

export const FIREBASE_CONFIG = {
	apiKey: 'AIzaSyAj2R8sLxgNVaSIHMcLnXKzTSoj5ACeZEg',
	authDomain: 'ceevee-9a7a5.firebaseapp.com',
	databaseURL: 'https://ceevee-9a7a5.firebaseio.com',
	projectId: 'ceevee-9a7a5',
	storageBucket: 'ceevee-9a7a5.appspot.com',
	messagingSenderId: '634507029561'
};

export const FIREBASE_ATUH_CONFIG = {
	provider: AuthProviders.Google,
	method: AuthMethods.Popup
};

