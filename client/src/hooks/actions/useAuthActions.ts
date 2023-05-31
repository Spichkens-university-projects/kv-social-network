import { bindActionCreators } from 'redux'
import { useTypedDispatch } from '@/hooks/TypedHooks'
import { AuthActions } from '@/store/root-actions'

export const useAuthActions = () => {
	const dispatch = useTypedDispatch()

	return bindActionCreators(AuthActions, dispatch)
}
