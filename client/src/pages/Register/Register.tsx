'use client';

import { Pages } from '@/utils/constants/pages.constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdOutlineAlternateEmail } from 'react-icons/md';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import FormInput from '@/components/ui/form/FormInput';
import Icon from '@/components/ui/primitives/Icon/Icon';
import Logo from '@/components/ui/primitives/Logo/Logo';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import { useAuthActions } from '@/hooks/actions/useAuthActions';

import { RegisterInputs } from '@/types/auth.types';

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterInputs>();

	const { signUp } = useAuthActions();
	const { replace } = useRouter();

	const onSubmit: SubmitHandler<RegisterInputs> = data => {
		try {
			signUp(data);
			replace(Pages.LOGIN);
		} catch (e: any) {
			toast.error(e.message);
		}
	};

	return (
		<VStack className={'items-center theme-block px-14 py-8 block-shadow rounded-md gap-6'}>
			<Logo />
			<div>Регистрация в KV</div>
			<form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					label={'Адрес электронной почты'}
					type={'email'}
					name={'email'}
					register={register}
					rules={{ required: 'Поле не может быть пустым' }}
					errors={errors}
				/>
				<FormInput
					label={'Пароль'}
					type={'text'}
					name={'password'}
					register={register}
					rules={{
						required: 'Поле не может быть пустым',
						minLength: { value: 4, message: 'Длина пароля: от 4 до 16 символов' },
						maxLength: { value: 16, message: 'Длина пароля: от 4 до 16 символов' }
					}}
					errors={errors}
					secured={true}
				/>
				<FormInput
					label={'Имя'}
					register={register}
					rules={{ required: 'Поле не может быть пустым' }}
					name={'name'}
					type={'text'}
					errors={errors}
				/>
				<FormInput
					label={'Фамилия'}
					type={'text'}
					name={'surname'}
					register={register}
					rules={{ required: 'Поле не может быть пустым' }}
					errors={errors}
				/>
				<FormInput
					label={'Имя пользователя'}
					type={'text'}
					name={'username'}
					register={register}
					rules={{ required: 'Поле не может быть пустым' }}
					errors={errors}
				>
					<Icon icon={MdOutlineAlternateEmail} />
				</FormInput>
				<VStack className={'gap-4'}>
					<Button type={'submit'} variant={'primary'}>
						Зарегистрироваться
					</Button>
					<HStack className={'self-center gap-2 items-center'}>
						<div>Уже есть аккаунт?</div>
						<Link href={Pages.LOGIN}>
							<div>Войти</div>
						</Link>
					</HStack>
				</VStack>
			</form>
		</VStack>
	);
};

export default Register;
