export const appDiv = document.getElementById("app") as HTMLDivElement

var id = 0

export const getId = () => id++

export namespace Random
{
    export function range(a: number,b: number)
    {
        const min = Math.ceil(a)
        const max = Math.floor(b)
        return Math.floor(Math.random() * (max - min) + min)
    }
}

export const rgb = (red: number,green: number,blue: number,alpha?: number) => alpha ? `rgba(${red},${green},${blue},${alpha});` : `rgb(${red},${green},${blue});`

export function getImageSize(source: CanvasImageSource): [number,number]
{
    if("width" in source && "height" in source)
        return [typeof source.width == "number" ? source.width : source.width.baseVal.value,typeof source.height == "number" ? source.height : source.height.baseVal.value]
    return [source.displayWidth,source.displayHeight]
}

export interface BBox
{
    left: number
    right: number
    top: number
    bottom: number
}

export interface IRect
{
    x: number
    y: number
    w: number
    h: number
}

export const bbox2rect = (bbox: BBox) => {return {x: bbox.left,y: bbox.top,w: bbox.right - bbox.left,h: bbox.bottom - bbox.top} as IRect}

export const bbox = (x: number,y: number,w: number,h: number) => {return {left: x,right: x + w,top: y,bottom: y + h} as BBox}

export const loadImage = (url: string) => new Promise<HTMLImageElement>((resolve,reject) =>
{
    const img = new Image()

    img.onload = () => resolve(img)
    img.onerror = () => reject()

    img.src = url
})

export const loadMultipleImages = (urls: Array<string>) => Promise.all(urls.map((url) => loadImage(url)))

export const loadAudio = (url: string) => new Promise<HTMLAudioElement>((resolve,reject) =>
{
    const audio = new Audio()

    audio.onload = () => resolve(audio)
    audio.onerror = () => reject()

    audio.src = url
})

export const loadMultipleAudio = (urls: Array<string>) => Promise.all(urls.map((url) => loadAudio(url)))

export const loadJSON = async <Type>(url: string) => await (await fetch(url)).json() as Type
export const loadMultipleJSON = <Type>(urls: Array<string>) => Promise.all(urls.map((url) => loadJSON<Type>(url)))

export type VerticalSide = "top" | "bottom"
export type HorizontalSide = "left" | "right"
export type CornorSide = `${VerticalSide}-${HorizontalSide}`
export type AnySide = VerticalSide | HorizontalSide | CornorSide

export function makeGlobal(obj: any,key: string)
{
    if(import.meta.env.DEV) 
        Object.defineProperty(window,key,{get: () => obj})
}