import { useTypedDispatch } from '@/hooks/TypedHooks'
import { PostActions } from '@/store/root-actions'
import { bindActionCreators } from 'redux'

export const usePostActions = () => {
	const dispatch = useTypedDispatch()

	return bindActionCreators(PostActions, dispatch)
}
