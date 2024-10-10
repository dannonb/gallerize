import { createAPIKey } from "@/lib/token"

export default function APIKeysPage() {
    createAPIKey()
    return (
        <div>API key</div>
    )
}