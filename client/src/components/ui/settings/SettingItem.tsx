import { forwardRef } from 'react';

import HStack from '@/components/containers/Stack/HStack/HStack';
import Input from '@/components/ui/primitives/Input/Input';

interface SettingItemProps {
	field: string;
	value: string;
}

const SettingItem = forwardRef<HTMLInputElement, SettingItemProps>(
	({ value, field, ...props }, ref) => {
		return (
			<div className={'grid grid-cols-2 items-center'}>
				<HStack className={'w-full'}>
					<p>{field}</p>
				</HStack>

				<HStack>
					<Input type='text' placeholder={value} defaultValue={value} ref={ref} {...props} />
				</HStack>
			</div>
		);
	}
);

SettingItem.displayName = 'SettingItem';

export default SettingItem;
