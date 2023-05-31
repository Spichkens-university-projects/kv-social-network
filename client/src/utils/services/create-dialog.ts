import toast from 'react-hot-toast';
import { AnyAction, Dispatch } from 'redux';

import { ChatService } from '@/services/chat.service';

import { addDialog, addDialogToLastDialogsSelector } from '@/store/chats/chat.slice';
import { setCurrentChat } from '@/store/chats/currentChat/currentChat';

import { IOtherUser } from '@/types/relation.types';

export const handleCreateDialogHelper = async (user: IOtherUser, dispatch: Dispatch<AnyAction>) => {
	try {
		const newDialog = await ChatService.createDialog({ withId: user._id });
		dispatch(addDialog(newDialog));
		dispatch(setCurrentChat(newDialog));
		dispatch(addDialogToLastDialogsSelector(newDialog));
		return newDialog;
	} catch (e) {
		toast.error('Ошибка создания диалога');
	}
};
