import { Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { IntrospectionField, IntrospectionInputValue } from 'graphql';
import React from 'react';
import { ArgCollector, getOfType, getOfTypeName } from '~utils/docParser';

interface IDocItemProps {
  field: IntrospectionField | IntrospectionInputValue;
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
      <Typography>{typeName}</Typography>
      {ArgCollector(field, stateSetter)?.map((item) => {
        return item;
      })}
      <Typography sx={{ color: orange[500], cursor: 'pointer' }} onClick={setType}>
        : {ofType}
      </Typography>
    </>
  );
};
