import { useTypedSelector } from '../TypedHooks'

export const useChatsState = () => useTypedSelector(state => state.chats)