import { getComponentBySlug } from "@/lib/utils";

export default function Documentation({ params }: { params: { slug: string } }) {
    return (
        <div>{getComponentBySlug(params.slug)}</div>
    )
}