import { PropsWithChildren, ReactElement } from 'react';

import StoreProvider from '@/myApp/StoreProvider';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { AuthorizedLayout, NonAuthorizedLayout } from '@/shared/providers';
import { NextPage } from 'next';

/**
 * Conditional render Layout. With Me Query
 */
export const ConditionLayout: NextPage<PropsWithChildren> = (props) => {
  const { data } = useMeQuery();

  return (
    <>
      {data ? (
        <AuthorizedLayout>{props.children}</AuthorizedLayout>
      ) : (
        <NonAuthorizedLayout>{props.children}</NonAuthorizedLayout>
      )}
    </>
  );
};

/**
 * Conditional render Layout. With Me Query.
 * If Me === true => authorizedLayout
 */
export const getConditionLayout = (page: ReactElement) => {
  return (
    <StoreProvider>
      <ConditionLayout>{page}</ConditionLayout>;
    </StoreProvider>
  );
};
