export default function Settings({ params }: { params: { slug: string } }) {
    return (
        <div>{params.slug}</div>
    )
}