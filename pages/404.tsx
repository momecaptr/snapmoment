// import { Typography } from '@/shared/ui';
//
// export default function NotFound() {
//   // Через function expression
//   return (
//     <div>
//       <Typography variant={'large'}>404, пачаны !</Typography>
//       <Typography variant={'large'}>Ну это мы еще не сделали</Typography>
//     </div>
//   );
// }

import { Typography } from '@/shared/ui';

const NotFound = () => {
  return (
    <>
      <Typography variant={'large'}>404, пачаны !</Typography>
      <Typography variant={'large'}>Ну это мы еще не сделали</Typography>
    </>
  );
};

export default NotFound;
