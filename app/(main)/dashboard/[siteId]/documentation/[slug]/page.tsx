export default function Documentation({ params }: { params: { slug: string } }) {
    return (
        <div>{params.slug}</div>
    )
}