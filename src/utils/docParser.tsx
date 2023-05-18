import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Typography } from '@mui/material';
import { DocItem } from '~compos/DocItem';
import { FieldsEntity, IDoc, Type } from '~interfaces/doc_interfaces';

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

export const ArgCollector = (field: FieldsEntity, stateSetter: (typeName: string) => void) => {
  const res: ReactJSXElement[] = [];
  if (!field.args) return;
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
  const query =
    'query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } } } fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } } fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue } fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } }';
  const res = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const { data }: IDoc = await res.json();
  return data.__schema;
};
