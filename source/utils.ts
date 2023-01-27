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
export abstract class CustomError extends Error
{
    protected constructor(name: string,message?: string,options?: ErrorOptions)
    {
        super(message,options)
        this.name = name
    }
}