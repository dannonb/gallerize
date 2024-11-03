import { getApiKey } from "@/actions/api-keys";
import { ApiAlert } from "@/components/ui/api-alert";
import ApiKeyButtons from "./api-key-buttons";

export default async function APIKeysPage({
  params,
  session,
}: {
  params: any;
  session: any;
}) {
  const userId = session.user.id;
  const siteId = params.siteId;

  const key = await getApiKey(siteId);

  return (
    <div className="flex flex-col space-y-8">
      <ApiKeyButtons siteId={siteId} userId={userId} apikey={key || ""} />
      {key && (
        <ApiAlert
          title="Api Key"
          description={key || "No information provided"}
          variant="secret"
        />
      )}
    </div>
  );
}
