import NotFoundPage from "./not-found";

import UploadPage from "./overview/upload";
import ImagesPage from "./overview/images";
import GalleriesPage from "./overview/galleries";

import GeneralSiteSettingsPage from "./settings/general";
import APIKeysPage from "./settings/api-keys";
import AccessPage from "./settings/access";
import IntegrationsPage from "./settings/integrations";
import SupportPage from "./settings/support";
import AdvancedSettingsPage from "./settings/advanced";
import UploadingImagesDocs from "./documentation/uploading-images";
import APIDocsPage from "./documentation/api";
import Stats from "./overview/stats";

interface Indexable {
  [key: string]: any;
}

export const components: Indexable = {
  // Overview Components
  upload: <UploadPage />,
  images: <ImagesPage />,
  galleries: <GalleriesPage />,
  stats: <Stats params={{siteId: ""}} />,

  // Documentation Components
  "uploading-images": <UploadingImagesDocs />,
  api: <APIDocsPage />,


  // Settings Components
  general: <GeneralSiteSettingsPage />,
  access: <AccessPage />,
  "api-keys": <APIKeysPage params={undefined} session={undefined} />,
  integrations: <IntegrationsPage />,
  support: <SupportPage />,
  advanced: <AdvancedSettingsPage />,

  // Not found component as fallback
  notFound: <NotFoundPage />,
};
