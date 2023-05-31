import { useTypedSelector } from '../TypedHooks'

export const usePostsState = () => useTypedSelector(state => state.posts)
