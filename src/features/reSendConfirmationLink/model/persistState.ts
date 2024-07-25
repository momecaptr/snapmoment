// // persistState.ts
// import { RootState } from '@/myApp/store';
// import Cookies from 'js-cookie';
//
// export const saveStateToCookies = (state: RootState) => {
//   try {
//     const serializedState = JSON.stringify(state);
//
//     Cookies.set('state', serializedState);
//   } catch (e) {
//     console.warn('Could not save state', e);
//   }
// };
//
// export const loadStateFromCookies = (): RootState | undefined => {
//   try {
//     const serializedState = Cookies.get('state');
//
//     if (serializedState === null) {
//       return undefined;
//     }
//
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.warn('Could not load state', e);
//
//     return undefined;
//   }
// };
