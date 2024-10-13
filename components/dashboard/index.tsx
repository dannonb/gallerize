import NotFoundPage from "./not-found";
import UploadPage from "./overview/upload"
import ImagesPage from "./overview/images";
import GalleriesPage from './overview/galleries'

import GeneralSiteSettingsPage from "./settings/general"
import APIKeysPage from "./settings/api-keys";

interface Indexable {
    [key: string]: any;
}

export const components: Indexable = {
    // Overview Components
    "upload": <UploadPage />,
    "images": <ImagesPage />,
    "galleries": <GalleriesPage />,

    // Settings Components
    "general": <GeneralSiteSettingsPage />,
    "api-keys": <APIKeysPage />,


    "notFound": <NotFoundPage />
}