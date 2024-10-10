import { getComponentBySlug } from "@/lib/utils";

export default function Settings({ params }: { params: { slug: string } }) {
    return (
        <div>{getComponentBySlug(params.slug)}</div>
    )
}