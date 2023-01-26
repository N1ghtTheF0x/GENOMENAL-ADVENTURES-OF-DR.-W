import { createBBos } from "../math"
import Context from "./context"
import CPUContext from "./cpu/context"
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

class Canvas
{
    #div = getContainer()
    #canvas = getCanvas()
    drawHitbox: boolean = false
    context: Context
    get element() { return this.#canvas }
    get container() { return this.#div }
    constructor()
    {
        this.#div.append(this.#canvas)

        document.body.appendChild(this.#div)

        if(Canvas.checkContext("webgl2")) this.context = this.#init_gpu()
        else if(Canvas.checkContext("2d")) this.context = this.#init_cpu()
        else throw new Error("You PC cannot handle these Graphics!")
    }
    #init_cpu()
    {
        return new CPUContext(this.#canvas)
    }
    #init_gpu()
    {
        return new CPUContext(this.#canvas)
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

    export function checkContext(type: "2d" | "webgl" | "webgl2")
    {
        const canvas = document.createElement("canvas")

        const context = canvas.getContext(type)

        return context != null
    }
}

export default Canvas