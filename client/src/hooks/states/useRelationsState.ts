import { useTypedSelector } from '../TypedHooks'

export const useRelationsState = () => useTypedSelector(state => state.relations)
