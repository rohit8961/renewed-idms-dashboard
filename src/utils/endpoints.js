const baseUrl = import.meta.env.VITE_API_URL

export const login = '/login';
export const bssaStaff = '/idcard-Bssa-staff';
export const empAgency = '/idcard-emp-agency';
export const kisc_staff = '/idcard-kisc-staff';
export const kisc_player = '/idcard-kisc-player';

//create games 

export const createGame = '/games';
export const gameList = '/games';
export const GameDeleteUpdate = (id) => `${baseUrl}/games/${id}`;
export const gameEdit = '/game-edit/:id';
//create games 

export const createAgency = '/agency';
export const agencyList = '/agency';
export const agencyDeleteUpdate = (id) => `${baseUrl}/agency/${id}`;
export const agencyEdit = '/agency-edit/:id';



