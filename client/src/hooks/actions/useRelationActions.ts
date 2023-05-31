import { useTypedDispatch } from '@/hooks/TypedHooks'
import { RelationActions } from '@/store/root-actions'
import { bindActionCreators } from 'redux'

export const useRelationActions = () => {
	const dispatch = useTypedDispatch()

	return bindActionCreators(RelationActions, dispatch)
}
