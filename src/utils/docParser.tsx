import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { DocItem } from '~compos/DocItem';
import { FieldsEntity, Schema, Type, TypesEntity } from '~interfaces/doc_interfaces';

export function getOfTypeName(type: Type): string {
  return type.ofType ? getOfTypeName(type.ofType) : type.name!;
}

export function getOfType(type: Type, namesArr: string[] = []): string {
  if (type.ofType) {
    namesArr.push(type.kind!);
    return getOfType(type.ofType, namesArr);
  } else {
    namesArr.push(type.name!);
    const res = namesArr.reduceRight((acc, item) => {
      if (item.match(/non_null/i)) {
        return `${acc}!`;
      } else if (item.match(/list/i)) {
        return `[${acc}]`;
      } else {
        return item;
      }
    }, '');
    return res;
  }
}

export const ArgCollector = (
  field: FieldsEntity,
  schema: Schema,
  stateSetter: Dispatch<SetStateAction<TypesEntity | undefined>>
) => {
  const res: ReactJSXElement[] = [];
  if (!field.args) return;
  else {
    res.push(<Typography key={'('}>(</Typography>);
    field.args.forEach((item, i, arr) => {
      if (item) {
        res.push(<DocItem field={item} schema={schema} stateSetter={stateSetter} key={i} />);
        if (i !== arr.length - 1) res.push(<Typography key={' '}>,{'\u00A0'}</Typography>);
      }
    });
    res.push(<Typography key={')'}>)</Typography>);
    return res;
  }
};
