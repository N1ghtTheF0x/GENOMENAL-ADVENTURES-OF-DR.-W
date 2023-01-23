import { Rect, Size, Vector2 } from "../math";

abstract class CanvasItem
{
    origin: Vector2
    rotation: number = 0
    set rotationDeg(val) {this.rotation = val * Math.PI/180}
    get rotationDeg() {return this.rotation * 180/Math.PI}
    static HITBOX_COLOR = "red"
    constructor(readonly rect: Rect)
    {
        this.origin = Vector2(rect.width/2,rect.height/2)
    }
    abstract draw(context: CanvasRenderingContext2D): void
    rotate(context: CanvasRenderingContext2D)
    {
        context.translate(this.rect.x+this.origin.x | 0,this.rect.y+this.origin.y | 0)
        context.rotate(this.rotation | 0)
        context.translate((this.rect.x+this.origin.x | 0)*-1,(this.rect.y+this.origin.y | 0)*-1)
    }
    drawHitbox(context: CanvasRenderingContext2D)
    {
        context.save()

        this.rotate(context)

        context.strokeStyle = CanvasItem.HITBOX_COLOR
        context.strokeRect(this.rect.x | 0,this.rect.y | 0,this.rect.width | 0,this.rect.height | 0)

        context.restore()
    }
}

namespace CanvasItem
{
    export type ModeStyle = {
        "fill": CanvasRenderingContext2D["fillStyle"]
        "stroke": CanvasRenderingContext2D["strokeStyle"]
    }

    export class Rectangle<M extends keyof ModeStyle = "fill"> extends CanvasItem
    {
        constructor(rect: Rect,readonly style: ModeStyle[M] = "black",readonly mode: M = "fill" as M)
        {
            super(rect)
        }
        draw(context: CanvasRenderingContext2D) 
        {
            context.save()

            this.rotate(context)

            context[`${this.mode}Style`] = this.style
            context[`${this.mode}Rect`](this.rect.x | 0,this.rect.y | 0,this.rect.width | 0,this.rect.height | 0)
            
            context.restore()
        }
    }
    export class Image extends CanvasItem
    {
        static getSize(image: CanvasImageSource): Size
        {
            const width = typeof image.width == "number" ? image.width : image.width.baseVal.value
            const height = typeof image.height == "number" ? image.height : image.height.baseVal.value

            return {width,height}
        }
        constructor(readonly image: CanvasImageSource,pos: Vector2,readonly source: Rect = {...Image.getSize(image),x: 0,y: 0},size: Size = Image.getSize(image))
        {
            super({
                ...pos,...size
            })
        }
        draw(context: CanvasRenderingContext2D)
        {
            context.save()

            this.rotate(context)

            context.drawImage(this.image,
                this.source.x | 0,this.source.y | 0,this.source.width | 0,this.source.height | 0,
                this.rect.x | 0,this.rect.y | 0,this.rect.width | 0,this.rect.height | 0)

            context.restore()
        }
    }
    export class Text<M extends keyof ModeStyle = "fill"> extends CanvasItem
    {
        constructor(pos: Vector2,readonly text: string,readonly font: string = "monospace",height: number = 11,readonly mode: M = "fill" as M)
        {
            super({...pos,width: 0,height})
        }
        draw(context: CanvasRenderingContext2D): void 
        {
            const m = context.measureText(this.text)
            this.rect.width = m.width

            context.save()

            this.rotate(context)

            context.font = `${this.rect.height}px ${this.font}`
            context[`${this.mode}Text`](this.text,this.rect.x | 0,this.rect.y | 0,this.rect.width | 0)

            context.restore()
        }
    }
}

export default CanvasItem