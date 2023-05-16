import { Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import React, { Dispatch, SetStateAction } from 'react';
import { FieldsEntity, Schema, TypesEntity } from '~interfaces/doc_interfaces';
import { getOfType, getOfTypeName } from '~utils/docparser';

interface IDocItemProps {
  field: FieldsEntity;
  schema: Schema;
  stateSetter: Dispatch<SetStateAction<TypesEntity | undefined>>;
}

export const DocItem: React.FC<IDocItemProps> = ({ field, schema, stateSetter }: IDocItemProps) => {
  const typeName = field.name;
  const ofType = getOfType(field.type);

  const setType = () => {
    const typeToSet = schema.types.find((item) => item.name === getOfTypeName(field.type));
    stateSetter(typeToSet);
  };

  return (
    <>
      <Typography component={'span'}>{typeName}</Typography>
      {field.args && (
        <Typography>
          (
          {field.args.map(
            (item, ind) =>
              item && <DocItem schema={schema} stateSetter={stateSetter} field={item} key={ind} />
          )}
          )
        </Typography>
      )}
      <Typography component={'span'}>:{'\u00A0'}</Typography>
      <Typography
        sx={{ color: orange[500], cursor: 'pointer' }}
        component={'span'}
        onClick={setType}
      >
        {ofType} {'\u00A0'}
      </Typography>
    </>
  );
};
