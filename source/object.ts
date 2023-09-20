import { DrawImageOptions, DrawStyle, DrawStyleOptions, DrawTextOptions, drawImage, drawRect, drawText, offset } from "./canvas"
import { mouseX, mouseY } from "./input"
import { BBox, getId, bbox, AnySide, IRect } from "./utils"

export abstract class EObject implements IRect
{
    public readonly id = getId()
    public get bbox(): BBox {return bbox(this.x,this.y,this.w,this.h)}
    public get centerX(){return this.x+this.centerW}
    public get centerY(){return this.y+this.centerH}
    public get centerW(){return this.w/2}
    public get centerH(){return this.h/2}
    public get screenX(){return this.x + offset.x}
    public get screenY(){return this.y + offset.y}
    public static CurrentlyDrawing: Array<EObject> = []
    public constructor(public x: number,public y: number,public w: number,public h: number,public readonly type: EObject.Type = "dummy")
    {

    }
    protected abstract drawImpl(): void
    public draw(): void
    {
        this.drawImpl()
        EObject .CurrentlyDrawing.push(this)
    }
    public isMouseOver()
    {
        const left = this.screenX
        const top = this.screenY
        const right = left + this.w
        const bottom = top + this.h

        const x = left >= mouseX && right <= mouseX
        const y = top >= mouseY && bottom <= mouseY
        return x && y
    }
    public distance(obj: EObject)
    {
        return Math.sqrt(Math.pow(obj.x - this.x,2) + Math.pow(obj.y - this.y,2))
    }
    public collides(obj: EObject): EObject.CollisionDirection
    {
        if (this.bbox.right < obj.bbox.left || this.bbox.left > obj.bbox.right || this.bbox.bottom < obj.bbox.top || this.bbox.top > obj.bbox.bottom)
            return "none"

        if (this.bbox.right >= obj.bbox.left && this.bbox.left <= obj.bbox.left) 
        {
            if (this.bbox.bottom >= obj.bbox.top && this.bbox.top <= obj.bbox.top)
                return "top-left"
            
            if (this.bbox.top <= obj.bbox.bottom && this.bbox.bottom >= obj.bbox.bottom)
                return "bottom-left"
            return "left"
        }

        if (this.bbox.left <= obj.bbox.right && this.bbox.right >= obj.bbox.right) 
        {
            if (this.bbox.bottom >= obj.bbox.top && this.bbox.top <= obj.bbox.top)
                return "top-right"
            if (this.bbox.top <= obj.bbox.bottom && this.bbox.bottom >= obj.bbox.bottom)
                return "bottom-right"
            return "right"
        }

        if (this.bbox.bottom >= obj.bbox.top && this.bbox.top <= obj.bbox.top) 
            return "top"

        if (this.bbox.top <= obj.bbox.bottom && this.bbox.bottom >= obj.bbox.bottom) 
            return "bottom"

        return "inside"
    }
}

export namespace EObject
{
    export type Type = "dummy" | "rect" | "text" | "image"
    export type CollisionDirection = "none" | "inside" | AnySide
    export class Rect<D extends DrawStyle = DrawStyle> extends EObject
    {
        public static: boolean = false
        public constructor(x: number,y: number,w: number,h: number,public options: DrawStyleOptions<D>)
        {
            super(x,y,w,h,"rect")
        }
        public drawImpl(): void 
        {
            drawRect(this.x,this.y,this.w,this.h,this.options)
        }
    }
    export class Text<D extends DrawStyle = DrawStyle> extends EObject
    {
        public constructor(x: number,y: number,public text: string,public options: DrawTextOptions<D>)
        {
            super(x,y,0,0,"text")
        }
        public drawImpl(): void 
        {
            drawText(this.x,this.y,this.text,this.options)
        }
    }
    export class Image extends EObject
    {
        public constructor(x: number,y: number,public readonly image: CanvasImageSource,public options: DrawImageOptions = {})
        {
            super(x,y,NaN,NaN,"image")
        }
        public drawImpl(): void 
        {
            drawImage(this.image,this.x,this.y,this.options)
        }
    }
    export class Group extends EObject
    {
        public list: Array<EObject>
        public constructor(...list: Array<EObject>)
        {
            super(NaN,NaN,NaN,NaN)
            if(list.length == 0) throw new Error("EObject.Group cannot be empty!")
            this.list = list
            this.updateProperties()
        }
        private getMinXProperty()
        {
            const list = this.list.toSorted((a,b) => a.x - b.x)
            return list[0].x
        }
        private getMinYProperty()
        {
            const list = this.list.toSorted((a,b) => a.y - b.y)
            return list[0].y
        }
        private getMaxXProperty()
        {
            const list = this.list.toSorted((a,b) => b.x - a.x)
            return list[0].x
        }
        private getMaxYProperty()
        {
            const list = this.list.toSorted((a,b) => b.y - a.y)
            return list[0].y
        }
        private getMaxWProperty()
        {
            const list = this.list.toSorted((a,b) => b.x - a.x)
            return list[0].w
        }
        private getMaxHProperty()
        {
            const list = this.list.toSorted((a,b) => b.y - a.y)
            return list[0].h
        }
        private updateProperties()
        {
            this.x = this.getMinXProperty()
            this.y = this.getMinYProperty()
            this.w = this.getMaxXProperty() + this.getMaxWProperty()
            this.h = this.getMaxYProperty() + this.getMaxHProperty()
        }
        protected drawImpl(): void 
        {
            this.updateProperties()
            for(const item of this.list)
                item.draw()
        }
        public offset(x: number,y: number)
        {
            for(const item of this.list)
                item.x += x,item.y += y
        }
    }
}