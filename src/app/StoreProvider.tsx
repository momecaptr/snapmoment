// import { ReactNode, useRef } from 'react';
// import { Provider } from 'react-redux';
//
// import { AppStore, store } from '@/app/store';
//
// export default function StoreProvider({ children }: { children: ReactNode }) {
//   const storeRef = useRef<AppStore>();
//
//   if (!storeRef.current) {
//     // Create the store instance the first time this renders
//     storeRef.current = makeStore();
//   }
//
//   return <Provider store={storeRef.current}>{children}</Provider>;
// }
