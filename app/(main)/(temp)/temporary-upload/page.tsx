import TempUploadForm from "@/components/forms/temp-upload-form";
import TempUploadError from "@/components/temp-upload-error";
import { verifyTempLink } from "@/lib/token";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function TempUploadPage({ searchParams }: any) {
  const data = await verifyTempLink(searchParams.token);

  if (!data) {
    toast('There has been an error')
    redirect("/")
  }
  const { siteId, galleryId, count } = data;

  return (
    <div className="w-full flex items-center justify-center p-12">
      {data?.error ? (
        <TempUploadError message={data.error as string} />
      ) : (
        <TempUploadForm
          siteId={siteId as string}
          galleryId={galleryId as string}
          count={count as string}
        />
      )}
    </div>
  );
}
