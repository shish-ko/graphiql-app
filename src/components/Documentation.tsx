import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { IDoc, Schema, TypesEntity } from '~interfaces/doc_interfaces';
import { useAlert } from '~utils/userHooks';
import { DocItemList } from './DocItemList';

export const loader = async () => {
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
  return data.__schema;
};

export const Documentation: React.FC = () => {
  const schema = useLoaderData() as Schema;
  const [typeToDisplay, setTypeToDisplay] = useState<TypesEntity>();
  const showMsg = useAlert();

  useEffect(() => {
    const queryTypes = schema.types!.find((item) => item.name.match(/query/i));
    queryTypes
      ? setTypeToDisplay(queryTypes)
      : showMsg({ type: 'error', content: 'Something went wrong...' });
  }, []);

  return (
    <Box>
      {typeToDisplay && schema && (
        <DocItemList type={typeToDisplay} schema={schema} stateSetter={setTypeToDisplay} />
      )}
    </Box>
  );
};
