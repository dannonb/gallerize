import { ApiAlert } from "@/components/ui/api-alert"
import { createAPIKey } from "@/lib/utils"

export default function APIKeysPage() {
    const apiKey = createAPIKey()
    console.log(apiKey)

    return (
        <div>
            <ApiAlert title="Api Key" description={apiKey} variant="public" />
        </div>
    )
}