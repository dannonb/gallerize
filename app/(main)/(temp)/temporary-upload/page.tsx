import TempUploadForm from "@/components/forms/temp-upload-form";
import { deleteTempUploadToken, verifyTempLink } from "@/lib/token";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function TempUploadPage({ searchParams }: any) {
  const token = await verifyTempLink(searchParams.token);

  if (!token || !token.data) {
    toast("There has been an error");
    redirect("/");
  }

  const { passcode, siteId, galleryId, count } = token.data;

  

  return (
    <div className="w-full flex items-center justify-center p-12">
      <TempUploadForm
          passcode={passcode as string}
          siteId={siteId as string}
          galleryId={galleryId as string}
          count={count as string}
          tokenId={token.id}
        />
    </div>
  );
}
