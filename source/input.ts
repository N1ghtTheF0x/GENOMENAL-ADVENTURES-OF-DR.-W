import { Vector2 } from "./math"

class Input
{
    keyboard: Input.Keyboard = {}
    mouse: Input.Mouse = [false,false,false,false,false]
    mousePos: Vector2 = {x: 0,y: 0}
    gamepads: ReturnType<Navigator["getGamepads"]> = []
    constructor()
    {
        window.addEventListener("keydown",(ev) =>
        {
            ev.preventDefault()
            this.keyboard[ev.key.toLowerCase()] = true
        })
        window.addEventListener("keyup",(ev) =>
        {
            ev.preventDefault()
            this.keyboard[ev.key.toLowerCase()] = false
        })
        window.addEventListener("keypress",(ev) =>
        {
            ev.preventDefault()
            this.keyboard[ev.key.toLowerCase()] = true
        })
        window.addEventListener("mousedown",(ev) =>
        {
            ev.preventDefault()
            this.mouse[ev.button] = true
        })
        window.addEventListener("mouseup",(ev) =>
        {
            ev.preventDefault()
            this.mouse[ev.button] = false
        })
        window.addEventListener("mousemove",(ev) =>
        {
            ev.preventDefault()
            this.mousePos = {x: ev.x,y: ev.y}
        })
        window.addEventListener("contextmenu",(ev) => ev.preventDefault())
    }
    update()
    {
        this.gamepads = navigator.getGamepads()
    }
}

namespace Input 
{
    export type Keyboard = {[key: string]: boolean}
    export type Mouse = [boolean,boolean,boolean,boolean,boolean]

    export enum MouseButton
    {
        Main,
        Auxiliary,
        Secondary,
        Back,
        Forward,
        Count
    }
}

export default Input