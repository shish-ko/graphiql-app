import { useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Schema, TypesEntity } from '~interfaces/doc_interfaces';
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
    variables?: string
  ) => {
    const res = await fetch('https://countries.trevorblades.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: variables
        ? JSON.stringify({ query, variables: JSON.parse(variables) })
        : JSON.stringify({ query }),
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, ' '));
  };
  return hook;
};

export const useDocumentation = (schema: Schema) => {
  const showMsg = useAlert();
  const [typeToDisplay, setTypeToDisplay] = useState<TypesEntity>();
  const [typesHistory, setTypesHistory] = useState<TypesEntity[]>([]);
  const [isBackPossible, setIsBackPossible] = useState(false);

  const typeSetter = (typeName: string) => {
    const schemaType = schema.types!.find((item) => item.name === typeName);
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
