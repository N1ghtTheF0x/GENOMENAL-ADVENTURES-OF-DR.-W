import { AlertError } from "./error"
import { EObject } from "./object"
import { options } from "./options"
import { appDiv, getImageSize, loadImage } from "./utils"

export const canvas = document.createElement("canvas")
export const ctx = getContext(canvas)

export const hitboxStyleValue: DrawValue<"stroke"> = "red"

export const offset = {
    x: 0,y: 0
}

export function updateResolution(canvas: HTMLCanvasElement)
{
    canvas.width = innerWidth
    canvas.height = innerHeight
    canvas.style.width = `${canvas.width}px`
    canvas.style.height = `${canvas.height}px`
}

export function setupCanvas(canvas: HTMLCanvasElement)
{
    canvas.id = "game"
    canvas.style.position = "fixed"
    canvas.style.inset = "0"
    window.addEventListener("resize",() => updateResolution(canvas))
    updateResolution(canvas)
    appDiv.append(canvas)
}

function getContext(canvas: HTMLCanvasElement)
{
    const ctx = canvas.getContext("2d")
    if(!ctx) throw new AlertError("Your Computer is not supported!")
    return ctx
}

export type DrawStyle = "fill" | "stroke"

export type DrawValue<D extends DrawStyle> = CanvasRenderingContext2D[`${D}Style`]

export interface DrawOptions
{
    static?: boolean
}

export interface DrawStyleOptions<D extends DrawStyle> extends DrawOptions
{
    style: D
    value?: DrawValue<D>
}

export function drawRect<D extends DrawStyle>(x: number,y: number,w: number,h: number,options: DrawStyleOptions<D>)
{
    ctx.save()

    ctx[`${options.style}Style`] = options.value ?? ctx[`${options.style}Style`]
    const drawX = options.static ? x : x + offset.x
    const drawY = options.static ? y : y + offset.y
    ctx[`${options.style}Rect`](drawX,drawY,w,h)
    drawHitbox(drawX,drawY,w,h)

    ctx.restore()
}

export interface DrawTextOptions<D extends DrawStyle> extends DrawStyleOptions<D>
{
    width?: number
    font?: string
    textAlign?: CanvasTextAlign
    textBaseLine?: CanvasTextBaseline
    direction?: CanvasDirection
}

export function drawText<D extends DrawStyle>(x: number,y: number,text: string,options: DrawTextOptions<D>)
{
    ctx.save()

    ctx.font = options.font ?? ctx.font
    ctx.textAlign = options.textAlign ?? ctx.textAlign
    ctx.textBaseline = options.textBaseLine ?? "top"
    ctx.direction = options.direction ?? ctx.direction
    ctx[`${options.style}Style`] = options.value = ctx[`${options.style}Style`]
    const measure = ctx.measureText(text)
    const w = options.width ??  measure.actualBoundingBoxRight - measure.actualBoundingBoxLeft
    const h = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent
    const drawX = options.static ? x : x + offset.x
    const drawY = options.static ? y : y + offset.y
    ctx[`${options.style}Text`](text,drawX,drawY,options.width)
    drawHitbox(drawX,drawY,w,h)

    ctx.restore()
}

export interface DrawSourceImageOptions extends DrawSizeImageOptions
{
    sx: number
    sy: number
    sw: number
    sh: number
}

export interface DrawSizeImageOptions extends DrawOptions
{
    w: number
    h: number
}

export type DrawImageOptions = DrawSourceImageOptions | DrawSizeImageOptions | DrawOptions

export function drawImage(source: CanvasImageSource,x: number,y: number,options: DrawImageOptions = {}): void
{
    ctx.save()

    const size = getImageSize(source)

    const drawX = options.static ? x : x + offset.x
    const drawY = options.static ? y : y + offset.y

    if("w" in options && "h" in options && "sx" in options && "sy" in options && "sw" in options && "sh" in options)
        ctx.drawImage(source,options.sx,options.sy,options.sw,options.sh,drawX,drawY,options.w,options.h)
    else if("w" in options && "h" in options) ctx.drawImage(source,drawX,drawY,options.w,options.h)
    else ctx.drawImage(source,drawX,drawY)
    
    const width = "w" in options ? options.w : size[0]
    const height = "h" in options ? options.h : size[1]

    drawHitbox(drawX,drawY,width,height)

    ctx.restore()
}

export function drawHitbox(x: number,y: number,w: number,h: number)
{
    if(!options.drawHitbox) return
    ctx.save()

    ctx.strokeStyle = hitboxStyleValue
    ctx.lineWidth = 5
    ctx.strokeRect(x,y,w,h)

    ctx.restore()
}

export function insideCanvas(x: number,y: number,w: number,h: number)
{
    return -w < x + offset.x && canvas.width + w > x + offset.x && -h < y + offset.y && canvas.height + h > y + offset.y
}

export function noHitbox(func: () => void)
{
    const last = options.drawHitbox
    options.drawHitbox = false
    func()
    options.drawHitbox = last
}

export function bakeImage(baker: () => void,width = canvas.width,height = canvas.height)
{
    const oldWidth = canvas.width
    const oldHeight = canvas.height
    const oldOffsetX = offset.x
    const oldOffsetY = offset.y
    canvas.width = width
    canvas.height = height
    offset.x = 0
    offset.y = 0
    baker()
    const url = canvas.toDataURL("image/png",1)
    clear()
    canvas.width = oldWidth
    canvas.height = oldHeight
    offset.x = oldOffsetX
    offset.y = oldOffsetY
    return loadImage(url)
}

export function clear() 
{
    EObject.CurrentlyDrawing = []
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export const toggleCursor = () => canvas.requestPointerLock()
