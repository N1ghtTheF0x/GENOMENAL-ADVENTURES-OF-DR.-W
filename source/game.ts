import Canvas from "./graphics/canvas";
import CanvasItem from "./graphics/item";
import Input from "./input";
import { Vector2 } from "./math";
import State from "./state";

class Game
{
    static readonly Instance = new this()
    #canvas: Canvas = new Canvas()
    #input: Input = new Input()

    get Canvas() { return this.#canvas }
    get Input() { return this.#input }

    #handle: number = NaN

    #lastTime: number = 0
    #currentTime: number = 0

    #currentState?: State = new State.Test()
    get currentState() {return this.#currentState}

    showFps: boolean = false
    private constructor()
    {
        Object.defineProperty(window,"game",{value: this,writable: false})
    }

    get time() { return this.#currentTime - this.#lastTime }
    get delta() { return this.time / 1000 }
    get fps() { return 1 / this.delta }
    start()
    {
        this.#canvas.element.focus()
        this.#handle = requestAnimationFrame((time) => this.#loop(time))
    }
    stop()
    {
        cancelAnimationFrame(this.#handle)
    }
    restart()
    {
        this.stop()
        this.start()
    }
    #loop(time: number)
    {
        this.#lastTime = this.#currentTime
        this.#currentTime = time

        this.#input.update()
        this.#update()

        this.#handle = requestAnimationFrame((time) => this.#loop(time))
    }
    #update()
    {
        if(this.currentState)
        {
            const state = this.currentState

            state.input(this)
            state.update(this)
            state.draw(this)
            if(this.showFps) document.title = `FPS: ${this.fps | 0}`
        }
    }
    loadState<S extends State>(State: new () => S,init = true)
    {
        const state: S = new State()
        if(init) 
        {
            if(!state.init(this)) throw new Error(`Couldn't load ${State.name}!`)
        }
        this.#currentState = state
    }
}

export default Game