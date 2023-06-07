import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Typography } from '@mui/material';
import {
  getIntrospectionQuery,
  IntrospectionField,
  IntrospectionInputValue,
  IntrospectionQuery,
} from 'graphql';
import { DocItem } from '~compos/DocItem';
import { IOfType } from '~interfaces/interfaces';

export function getOfTypeName(type: IOfType): string {
  return type.ofType ? getOfTypeName(type.ofType) : type.name!;
}

export function getOfType(type: IOfType, namesArr: string[] = []): string {
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
  field: IntrospectionField | IntrospectionInputValue,
  stateSetter: (typeName: string) => void
) => {
  const res: ReactJSXElement[] = [];
  if (!('args' in field)) return;
  else {
    res.push(<Typography key={'('}>(</Typography>);
    field.args.forEach((item, i, arr) => {
      if (item) {
        res.push(<DocItem field={item} stateSetter={stateSetter} key={i} />);
        if (i !== arr.length - 1) res.push(<Typography key={' '}>,{'\u00A0'}</Typography>);
      }
    });
    res.push(<Typography key={')'}>)</Typography>);
    return res;
  }
};

export const schemaFetcher = async () => {
  const res = await fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  const { data }: { data: IntrospectionQuery } = await res.json();
  return data;
};
