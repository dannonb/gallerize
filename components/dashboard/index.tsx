import EditImagesForm from "../forms/edit-images-form";
import GalleryForm from "../forms/gallery-form";
import UploadForm from "../forms/upload-form"
import NotFoundPage from "./not-found";

interface Indexable {
    [key: string]: any;
}

export const components: Indexable = {
    // Overview Components
    upload: <UploadForm />,
    images: <EditImagesForm />,
    galleries: <GalleryForm />,

    notFound: <NotFoundPage />
}