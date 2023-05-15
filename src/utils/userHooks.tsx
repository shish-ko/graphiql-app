import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IAlertPayload, storeDispatch, storeState } from '~interfaces/*';
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
