import styles from './CreateDialogButton.module.scss';
import { Pages } from '@/utils/constants/pages.constants';
import { concatPath } from '@/utils/helpers/concatPath';
import { handleCreateDialogHelper } from '@/utils/services/create-dialog';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { useTypedDispatch } from '@/hooks/TypedHooks';

import { IOtherUser } from '@/types/relation.types';

interface CreateDialogButtonProps {
	user: IOtherUser;
}

const CreateDialogButton: FC<CreateDialogButtonProps> = ({ user }) => {
	const dispatch = useTypedDispatch();
	const { replace } = useRouter();

	const handleCreateDialog = async () => {
		if (user) {
			const newDialog = await handleCreateDialogHelper(user, dispatch);
			if (newDialog) replace(concatPath(Pages.MESSENGER, newDialog._id));
		}
	};

	return (
		<p onClick={handleCreateDialog} className={styles.goToDialogButton}>
			Написать сообщение
		</p>
	);
};

export default CreateDialogButton;
