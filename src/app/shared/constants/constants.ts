import { AuthMethods, AuthProviders } from 'angularfire2';
export const MIN_FONT_SIZE: number = 0.8;
export const MAX_FONT_SIZE: number = 1.2;
export const FONT_SIZE_CHANGE_STEP: number = 0.05;

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
