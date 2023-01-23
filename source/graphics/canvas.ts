import { createBBos } from "../math"
import CanvasItem from "./item"

function getCanvas()
{
    const canvas = document.createElement("canvas")

    canvas.id = "iGEM-game-canvas"
    canvas.tabIndex = 0

    canvas.width = Canvas.WIDTH
    canvas.height = Canvas.HEIGHT

    canvas.style.inset = "0"
    canvas.style.height = "100%",canvas.style.width = "auto"
    canvas.style.imageRendering = "pixelated"
    canvas.style.backgroundColor = "white"
    canvas.style.outline = "none"

    return canvas
}

function getContainer()
{
    const div = document.createElement("div")

    div.id = "iGEM-game-container"

    div.style.position = "fixed"
    div.style.inset = "0"
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.textAlign = "center"
    div.style.backgroundColor = "black"
    div.style.imageRendering = "pixelated"
    div.style.outline = "none"

    return div
}

function getContext(html: HTMLCanvasElement)
{
    const context = html.getContext("2d")
    if(context == null) throw new Error("2D Graphics are not available!")

    context.imageSmoothingEnabled = false

    return context
}

class Canvas
{
    #div = getContainer()
    #canvas = getCanvas()
    #context = getContext(this.#canvas)
    drawHitbox: boolean = false
    get element() { return this.#canvas }
    get container() { return this.#div }
    constructor()
    {
        this.#div.append(this.#canvas)

        document.body.appendChild(this.#div)
    }
    draw(...items: CanvasItem[])
    {
        for(const item of items)
        {
            if(!Canvas.inside(item)) continue
            item.draw(this.#context)
            if(this.drawHitbox) item.drawHitbox(this.#context)
        }
    }
    clear()
    {
        this.#context.clearRect(0,0,Canvas.WIDTH,Canvas.HEIGHT)
    }
}

namespace Canvas
{
    export const WIDTH = 320
    export const HEIGHT = 200

    export function inside(item: CanvasItem)
    {
        const left = -item.rect.width
        const right = WIDTH + item.rect.width
        const top = -item.rect.height
        const bottom = HEIGHT + item.rect.height

        const bbox = createBBos(item.rect)

        return left < bbox.left && right > bbox.right &&
               top < bbox.top && bottom > bbox.bottom
    }
}

export default Canvas