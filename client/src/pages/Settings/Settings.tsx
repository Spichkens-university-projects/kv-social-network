'use client';

import styles from './Settings.module.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import VStack from '@/components/containers/Stack/VStack/VStack';
import Loader from '@/components/ui/primitives/Loader/Loader';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';
import SettingItem from '@/components/ui/settings/SettingItem';

import { useTypedDispatch } from '@/hooks/TypedHooks';
import { useAuthState } from '@/hooks/states/useAuthState';

import { UserService } from '@/services/user.service';

import { updateUser } from '@/store/auth/auth.slice';

import { IUser } from '@/types/users.types';

const Settings = () => {
	const { currentUser } = useAuthState();
	const dispatch = useTypedDispatch();
	const { handleSubmit, register, formState, reset } = useForm<Partial<IUser>>();

	const handleUpdateUserInfo = (data: Partial<IUser>) => {
		try {
			UserService.updateUser(data).then(res => dispatch(updateUser(res)));
			reset();
		} catch (e: any) {
			toast.error(e.message);
		}
	};

	if (!currentUser) return <Loader />;

	return (
		<form onSubmit={handleSubmit(handleUpdateUserInfo)} className={styles.container}>
			<p>Информация о пользователе</p>
			<VStack className={'gap-4 grow'}>
				<p>Личные данные</p>
				<SettingItem field={'Имя'} value={currentUser.name} {...register('name')} />
				<SettingItem field={'Фамилия'} value={currentUser.surname} {...register('surname')} />
				<SettingItem
					field={'Имя пользователя'}
					value={currentUser.username}
					{...register('username', { minLength: 1 })}
				/>
			</VStack>
			<Button type={'submit'} variant={'primary'}>
				Сохранить
			</Button>
		</form>
	);
};

export default Settings;
