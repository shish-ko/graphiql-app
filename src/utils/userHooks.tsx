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
