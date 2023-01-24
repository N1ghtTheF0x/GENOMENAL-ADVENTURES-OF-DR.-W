class Asset<Type = unknown>
{
    static blob(path: string)
    {
        return new this(async () => await (await fetch(path)).blob())
    }
    static image(path: Asset.ImagePath)
    {
        return new this(async () => await createImageBitmap((await (await fetch(path)).blob())))
    }
    static json<Output extends object>(path: Asset.JSONPath): Asset<Output>
    {
        return new this(async () => await (await fetch(path)).json())
    }
    #loader: Asset.Loader<Type>
    #value?: Type
    constructor(loader: Asset.Loader<Type>)
    {
        this.#loader = loader
        this.#load()
    }
    async #load()
    {
        this.#value = await this.#loader()
    }
    getValue(): Type
    {
        if(this.#value) return this.#value
        throw new Error("Asset hasn't loaded yet!")
    }
}

namespace Asset
{
    export type Loader<Type> = () => Type | Promise<Type>

    export type PNG = `${string}.png`
    export type JPG = `${string}.jpg`
    export type JPEG = `${string}.jpeg`

    export type ImagePath = PNG | JPEG | JPG

    export type JSONPath = `${string}.json`
}

export default Asset