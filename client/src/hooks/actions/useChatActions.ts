import { bindActionCreators } from 'redux'

import { useTypedDispatch } from '@/hooks/TypedHooks'

import { ChatActions } from '@/store/root-actions'


export const useChatActions = () => {
	const dispatch = useTypedDispatch()

	return bindActionCreators(ChatActions, dispatch)
}