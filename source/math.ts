export type Vector2 = {
    x: number
    y: number
}
export function Vector2(x: number,y: number): Vector2
{
    return {x,y}
}
export type Size = {
    width: number
    height: number
}
export function Size(width: number,height: number): Size
{
    return {width,height}
}
export type Rect = Vector2 & Size
export function Rect(x: number,y: number,width: number,height: number): Rect
{
    return {x,y,width,height}
}

export type BBox = {
    left: number
    right: number
    top: number
    bottom: number
}

export function createBBos(rect: Rect): BBox
{
    return {
        left: rect.x,right: rect.x + rect.width,
        top: rect.y,bottom: rect.y + rect.height
    }
}