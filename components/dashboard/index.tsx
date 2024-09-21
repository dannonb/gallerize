import { UploadForm } from "../forms/upload-form"

interface Indexable {
    [key: string]: any;
}

export const components: Indexable = {
    upload: <UploadForm />
}