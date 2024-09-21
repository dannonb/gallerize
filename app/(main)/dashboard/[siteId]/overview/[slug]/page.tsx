export default function Overview({ params }: { params: { slug: string } }) {
    return (
        <div>{params.slug}</div>
    )
}