import s from './TableParts.module.scss';

import { Typography } from '../typography/Typography';
import { TableParts } from './TableParts';

const meta = {
  component: TableParts,
  tags: ['autodocs'],
  title: 'Components/TableParts'
};

export default meta;
export const DefaultTable = () => {
  const headersName = [
    { key: 'name', title: 'Name' },
    { key: 'cardsCount', title: 'Cards' },
    { key: 'updated', title: 'Last Updated' },
    { key: 'created', title: 'Created by' }
  ];

  return (
    // <MemoryRouter initialEntries={['/']}>
    <TableParts.Root>
      <TableParts.Head>
        <TableParts.Row>
          {headersName.map((name) => (
            <TableParts.HeadCell key={name.key}>
              <Typography as={'span'} variant={'medium_text_14'}>
                {name.title}
              </Typography>
            </TableParts.HeadCell>
          ))}
          {/*<TableParts.HeadCell></TableParts.HeadCell>*/}
        </TableParts.Row>
      </TableParts.Head>
      <TableParts.Body>
        <TableParts.Row>
          <TableParts.Cell>
            <Typography as={'span'} variant={'regular_text_14'}>
              The place for rows...
            </Typography>
          </TableParts.Cell>
        </TableParts.Row>
      </TableParts.Body>
    </TableParts.Root>
    // </MemoryRouter>
  );
};
export const WithoutContent = () => {
  return (
    <Typography as={'div'} className={s.empty} variant={'regular_text_14'}>
      No content with these terms...
    </Typography>
  );
};
