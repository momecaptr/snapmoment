import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '@/myApp/store';

export default function StoreProvider({ children, ...rest }: { children: ReactNode }) {
  const { store } = wrapper.useWrappedStore(rest);

  return <Provider store={store}>{children}</Provider>;
}
