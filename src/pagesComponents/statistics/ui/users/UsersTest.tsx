import React, { useState } from 'react';

import { useGetUsersQuery } from '@/pagesComponents/statistics/ui/users/inctagramUsersApi';

export const UsersTest = () => {
  const [pageSize, setPageSize] = useState(4);

  const { data, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  console.log(data);

  return (
    <div>
      <select name={'page size'} onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={12}>12</option>
        <option value={20}>20</option>
      </select>
      {/*{data?.map((user) => {*/}
      {/*  return (*/}
      {/*    <div key={user.id} style={{ marginBottom: '30px' }}>*/}
      {/*      {JSON.stringify(user, null, 2)}*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
    </div>
  );
};
