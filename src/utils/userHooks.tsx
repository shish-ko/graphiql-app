import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { storeDispatch, storeState } from '~interfaces/*';

export const useAppSelector: TypedUseSelectorHook<storeState> = useSelector;
export const useAppDispatch = useDispatch<storeDispatch>;
