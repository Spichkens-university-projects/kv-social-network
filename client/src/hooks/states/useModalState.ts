import { useTypedSelector } from '../TypedHooks';

export const useModalState = () => useTypedSelector(state => state.modal);
