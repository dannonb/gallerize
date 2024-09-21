import { getComponentBySlug } from "@/lib/utils";

export default function Overview({ params }: { params: { slug: string } }) {
    return (
        <div>{getComponentBySlug(params.slug)}</div>
    )
}