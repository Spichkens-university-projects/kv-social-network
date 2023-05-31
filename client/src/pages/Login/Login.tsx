'use client';

import { Pages } from '@/utils/constants/pages.constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import HStack from '@/components/containers/Stack/HStack/HStack';
import VStack from '@/components/containers/Stack/VStack/VStack';
import FormInput from '@/components/ui/form/FormInput';
import Logo from '@/components/ui/primitives/Logo/Logo';
import Button from '@/components/ui/primitives/buttons/SubmitButton/Button';

import { useAuthActions } from '@/hooks/actions/useAuthActions';

import { LoginInputs } from '@/types/auth.types';

const Login = () => {
	const { replace } = useRouter();
	const { signIn } = useAuthActions();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginInputs>();

	const onSubmit: SubmitHandler<LoginInputs> = (data, event) => {
		event?.preventDefault();
		try {
			signIn(data);
			replace(Pages.NEWS);
		} catch (e: any) {
			toast.error(e.message);
		}
	};

	return (
		<VStack className={'items-center theme-block px-14 py-8 block-shadow rounded-md gap-6'}>
			<Logo />
			<div>Войти в KV</div>
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
					rules={{ required: 'Поле не может быть пустым' }}
					errors={errors}
					secured={true}
				/>
				<VStack className={'gap-4'}>
					<Button type={'submit'} variant={'primary'}>
						Войти
					</Button>
					<HStack className={'self-center gap-2 items-center'}>
						<div>Еще нет аккаунта?</div>
						<Link href={Pages.REGISTER}>
							<div>Зарегистрироваться</div>
						</Link>
					</HStack>
				</VStack>
			</form>
		</VStack>
	);
};

export default Login;
