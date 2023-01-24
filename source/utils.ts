export function isEmbedded()
{
    return window.frameElement != null
}
export function getTitle()
{
    return "Genomenal Adventures of Dr. W"
}
export function blob2image(blob: Blob)
{
    return createImageBitmap(blob)
}