export interface IFile {
	url: string;
	name: string;
}

export interface UploadFileRequestType {
	selectedFile: File;
	folder: string;
}
