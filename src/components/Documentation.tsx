import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Data, IDoc, Schema, TypesEntity } from '~interfaces/doc_interfaces';
import { DocItem } from './DocItem';

export const Documentation: React.FC = () => {
  const [fieldsArr, setFieldsArr] = useState<TypesEntity>();
  const [schema, setSchema] = useState<Schema>();

  useEffect(() => {
    const getShema = async () => {
      const query =
        'query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } } } fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } } fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue } fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } }';
      const res = await fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const { data }: IDoc = await res.json();
      setSchema(data.__schema);
      const queryTypes = data.__schema.types!.find((item) => item.name.match(/query/i));
      queryTypes ? setFieldsArr(queryTypes) : console.log('No query types');
    };
    getShema();
  }, []);
  return (
    <Box>
      {fieldsArr &&
        schema &&
        fieldsArr.fields!.map((item, ind) => (
          <DocItem stateSetter={setFieldsArr} type={item} key={ind} schema={schema} />
        ))}
    </Box>
  );
};
