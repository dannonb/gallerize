import {
  getTotalGalleries,
  getTotalImages,
  getTotalStorageSize,
} from "@/actions/stats";
import { Progress } from "@/components/ui/progress";
import { tiers } from "@/lib/constants";

export default async function Stats({
  params,
}: {
  params: { siteId: string };
}) {
  const siteId = params.siteId;

  if (siteId) {
  }

  const currentTier = tiers.starter;

  const totalImages = await getTotalImages(siteId);
  const totalGalleries = await getTotalGalleries(siteId);
  const totalStorage = await getTotalStorageSize(siteId);

  const imagePercentage =
    ((totalImages || 0) /
      (currentTier.maxImagesPerGallery * currentTier.maxGalleriesPerSite)) *
    100;

  const galleryPercentage = ((totalGalleries || 0) / currentTier.maxGalleriesPerSite) * 100

  const storagePercentage = (totalStorage || 0) / currentTier.totalStorageGB

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <h4 className="text-xl">Images</h4>
        <div>
          <Progress value={parseInt(imagePercentage.toFixed(1))} />
          <p>
            {totalImages}/
            {currentTier.maxImagesPerGallery * currentTier.maxGalleriesPerSite}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h4 className="text-xl">Galleries</h4>
        <div>
          <Progress value={parseInt(galleryPercentage.toFixed(1))} />
          <p>
            {totalGalleries}/
            {currentTier.maxGalleriesPerSite}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h4 className="text-xl">Storage</h4>
        <div>
          <Progress value={parseInt(storagePercentage.toFixed(1))} />
          <p>
            {totalStorage?.toFixed(1)}/
            {currentTier.totalStorageGB}
          </p>
        </div>
      </div>
    </div>
  );
}
