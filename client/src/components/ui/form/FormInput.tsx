'use client';

import { cn } from '@/utils/helpers/cn.helper';
import { ErrorMessage } from '@hookform/error-message';
import get from 'lodash.get';
import { useState } from 'react';
import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import VStack from '@/components/containers/Stack/VStack/VStack';
import { FormErrorMessage } from '@/components/ui/form/FormErrorMessage/FormErrorMessage';
import Icon from '@/components/ui/primitives/Icon/Icon';
import Input, { InputProps } from '@/components/ui/primitives/Input/Input';

import { LoginInputs, RegisterInputs } from '@/types/auth.types';

export type FormInputProps<T extends FieldValues> = {
	label: string;
	secured?: boolean;
	name: Path<T>;
	rules?: RegisterOptions;
	register?: UseFormRegister<T>;
	errors?: Partial<DeepMap<T, FieldError>>;
} & Omit<InputProps, 'name'> &
	InputProps;

const FormInput = <TFormValues extends RegisterInputs | LoginInputs>({
	label,
	secured,
	className,
	name,
	register,
	rules,
	type,
	children,
	errors,
	...props
}: FormInputProps<TFormValues>) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const errorMessages = get(errors, name);
	const hasError = !!(errors && errorMessages);

	return (
		<VStack className={'gap-2'}>
			<label>{label}</label>
			<Input
				{...props}
				{...(register && register(name, rules))}
				className={cn(hasError && 'border-accents-red', 'border-2 w-[400px] relative', className)}
				type={!isPasswordVisible && secured ? 'password' : type}
			>
				{secured ? (
					<Icon
						icon={isPasswordVisible ? AiFillEye : AiFillEyeInvisible}
						onMouseDown={() => setIsPasswordVisible(true)}
						onMouseUp={() => setIsPasswordVisible(false)}
						className={'absolute -right-12'}
					/>
				) : (
					children
				)}
			</Input>

			<ErrorMessage
				errors={errors}
				name={name as any}
				render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
			/>
		</VStack>
	);
};

export default FormInput;
