import { Vector2 } from "../../math";
import Context from "../context";
import CanvasItem from "../item";

function getContext(html: HTMLCanvasElement)
{
    const context = html.getContext("2d")
    if(context == null) throw new Error("2D Graphics are not available!")

    context.imageSmoothingEnabled = false

    return context
}

class CPUContext extends Context
{
    context: CanvasRenderingContext2D
    constructor(canvas: HTMLCanvasElement)
    {
        super(canvas)
        this.context = getContext(canvas)
    }
    draw(...items: CanvasItem[]): void 
    {
        for(const item of items)
        {
            this.#drawItem(item)
            if(this.drawHitbox) this.#drawHitbox(item)
        }
    }
    clear(): void 
    {
        return this.context.clearRect(0,0,this.canvas.width,this.canvas.height)    
    }
    #rotate(pos: Vector2,org: Vector2,radian: number)
    {
        this.context.translate(pos.x+org.x | 0,pos.y+org.y | 0)
        this.context.rotate(radian)
        this.context.translate((pos.x+org.x | 0)*-1,(pos.y+org.y | 0)*-1)
    }
    #drawItem(item: CanvasItem)
    {
        if(item instanceof CanvasItem.Rectangle) return this.#drawRect(item)
        if(item instanceof CanvasItem.Image) return this.#drawImage(item)
        if(item instanceof CanvasItem.Text) return this.#drawText(item)
    }
    #drawHitbox(item: CanvasItem)
    {
        this.context.save()

        this.#rotate(item.rect,item.origin,item.rotation)

        this.context.strokeStyle = CanvasItem.HITBOX_COLOR
        this.context.strokeRect(item.rect.x | 0,item.rect.y | 0, item.rect.width | 0,item.rect.height | 0)

        this.context.restore()
    }
    #drawRect(item: CanvasItem.Rectangle)
    {
        this.context.save()

        this.#rotate(item.rect,item.origin,item.rotation)

        this.context[`${item.mode}Style`] = item.style
        this.context[`${item.mode}Rect`](item.rect.x | 0,item.rect.y | 0, item.rect.width | 0,item.rect.height | 0)

        this.context.restore()
    }
    #drawImage(item: CanvasItem.Image)
    {
        this.context.save()

        this.#rotate(item.rect,item.origin,item.rotation)

        this.context.drawImage(item.image,
            item.source.x | 0,item.source.y | 0,item.source.width | 0,item.source.height | 0,
            item.rect.x | 0,item.rect.y | 0,item.rect.width | 0,item.rect.height | 0
        )

        this.context.restore()
    }
    #drawText(item: CanvasItem.Text)
    {
        // TODO: Custom Font Renderer using Image
    }
}

export default CPUContext