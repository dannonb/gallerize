import UploadPage from "./overview/upload"
import NotFoundPage from "./not-found";
import ImagesPage from "./overview/images";
import GalleriesPage from './overview/galleries'

interface Indexable {
    [key: string]: any;
}

export const components: Indexable = {
    // Overview Components
    upload: <UploadPage />,
    images: <ImagesPage />,
    galleries: <GalleriesPage />,

    notFound: <NotFoundPage />
}