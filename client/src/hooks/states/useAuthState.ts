import { useTypedSelector } from '../TypedHooks'

export const useAuthState = () => useTypedSelector(state => state.auth)
