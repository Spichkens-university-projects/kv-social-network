import { axiosWithToken } from '@/axios/axios';

import { IFile, UploadFileRequestType } from '@/types/files.types';

export const FileService = {
	async uploadFile({ selectedFile, folder }: UploadFileRequestType) {
		const formData = new FormData();
		formData.append('file', selectedFile);

		const response = await axiosWithToken.post<IFile>(`/files/upload?folder=${folder}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		return response.data;
	},

	async deleteFile(url: string) {
		const response = await axiosWithToken.delete<{ url: string }>(`/files/delete?url=${url}`);
		return response.data;
	}
};
