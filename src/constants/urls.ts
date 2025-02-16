export const HOST = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000';

export const BASE_URL = HOST + '/api/';

export const GENDERS_URL = BASE_URL + 'genders';
export const MUSICS_URL = BASE_URL + 'musics';
export const MUSIC_BY_GENDER = BASE_URL + 'musics/gender/';
export const POST_EMAIL_SUCESS = BASE_URL + '/email/success/';
export const CREATE_CHECKOUT_URL = BASE_URL + '/mp/create-checkout';
