"use client";

import { createApiKey, deleteApiKey } from "@/actions/api-keys";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApiKeyButtons({
  siteId,
  userId,
  apikey
}: {
  siteId: string;
  userId: string;
  apikey: string;
}) {
const router = useRouter()
const [loading, setLoading] = useState(false)

  const onCreateKey = async () => {
    setLoading(true)
    try {
      if (!userId || !siteId) return;
      const newKey = await createApiKey(siteId as string, userId);
      console.log(newKey)

      if (!newKey) return;

      router.refresh()

    } catch (error) {
      console.log(error);
    } finally {
        setLoading(false)
    }
  };

  const onDeleteKey = async () => {
    //deleteApiKey
    console.log(apikey)
    try {
        if (!userId || !siteId || !apikey) return;
        const deletedKey = await deleteApiKey(siteId, apikey)
        console.log(deletedKey)

        router.refresh()
    } catch(error) {

    }
  };
  return (
    <div className="flex space-x-8">
      <Button disabled={loading} onClick={() => onCreateKey()}>Generate New Key</Button>
      {apikey && <Button disabled={loading} onClick={() => onDeleteKey()} variant="destructive">Remove Key</Button>}
    </div>
  );
}
