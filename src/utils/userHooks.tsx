import { IntrospectionQuery, IntrospectionType } from 'graphql';
import { useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IAlertPayload, storeDispatch, storeState } from '~interfaces/interfaces';
import { invokeAlert } from '~store/alertSlice';

export const useAppSelector: TypedUseSelectorHook<storeState> = useSelector;
export const useAppDispatch = useDispatch<storeDispatch>;

export const useAlert = () => {
  const dispatch = useAppDispatch();
  const hook = (alertPayload: IAlertPayload) => {
    dispatch(invokeAlert(alertPayload));
  };
  return hook;
};

export const useQuery = () => {
  const hook = async (
    setResponse: (value: React.SetStateAction<string>) => void,
    query: string,
    variablesString?: string
  ) => {
    let variables;
    try {
      if (variablesString) variables = JSON.parse(variablesString);
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e) {
        return setResponse('Variables mistake: ' + (e.message as { message: string }));
      }
    }
    const res = await fetch('https://countries.trevorblades.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, ' '));
  };
  return hook;
};

export const useDocumentation = (schema: IntrospectionQuery) => {
  const showMsg = useAlert();
  const [typeToDisplay, setTypeToDisplay] = useState<IntrospectionType>();
  const [typesHistory, setTypesHistory] = useState<IntrospectionType[]>([]);
  const [isBackPossible, setIsBackPossible] = useState(false);

  const typeSetter = (typeName: string) => {
    const schemaType = schema.__schema.types!.find((item) => item.name === typeName);
    if (schemaType) {
      const newHistory = typesHistory.slice();
      newHistory.push(schemaType);
      setTypesHistory(newHistory);
      setTypeToDisplay(schemaType);
      newHistory.length > 1 ? setIsBackPossible(true) : setIsBackPossible(false);
    } else {
      showMsg({ type: 'error', content: 'Something went wrong...' });
    }
  };

  const getBack = () => {
    const newHistory = typesHistory.slice();
    newHistory.pop();
    setTypesHistory(newHistory);
    setTypeToDisplay(newHistory.at(-1));
    newHistory.length > 1 ? setIsBackPossible(true) : setIsBackPossible(false);
  };

  return { typeToDisplay, typeSetter, getBack, isBackPossible };
};
