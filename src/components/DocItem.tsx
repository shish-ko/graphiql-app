import { Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import React from 'react';
import { FieldsEntity } from '~interfaces/doc_interfaces';
import { ArgCollector, getOfType, getOfTypeName } from '~utils/docParser';

interface IDocItemProps {
  field: FieldsEntity;
  stateSetter: (typeName: string) => void;
}

export const DocItem: React.FC<IDocItemProps> = ({ field, stateSetter }: IDocItemProps) => {
  const typeName = field.name;
  const ofType = getOfType(field.type);

  const setType = () => {
    stateSetter(getOfTypeName(field.type));
  };

  return (
    <>
      <Typography component={'span'}>{typeName}</Typography>
      {ArgCollector(field, stateSetter)?.map((item) => {
        return item;
      })}
      <Typography
        sx={{ color: orange[500], cursor: 'pointer' }}
        component={'span'}
        onClick={setType}
      >
        : {ofType}
      </Typography>
    </>
  );
};
