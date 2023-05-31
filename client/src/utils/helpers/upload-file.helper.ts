import { ChangeEvent } from 'react';

import { FileService } from '@/services/file.service';

import { IFile } from '@/types/files.types';

export const uploadHelper = async (
	event: ChangeEvent<HTMLInputElement>,
	folder: string,
	cb?: (res: IFile) => void
) => {
	if (event.target.files) {
		const file = event.target.files[0];
		await FileService.uploadFile({
			selectedFile: file,
			folder
		})
			.then(res => cb && cb(res))
			.then(() => {
				event.target.files = null;
			});
	}
};
