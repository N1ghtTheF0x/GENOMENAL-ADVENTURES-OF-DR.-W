export type LoopType = "requestAnimationFrame" | "setInterval" | "setTimeout"

export type LoopHandler = (loop: Loop) => void

export abstract class Loop
{
    public currentTime = 0
    public lastTime = 0
    public get delta(){return this.currentTime - this.lastTime}
    public get deltaTime(){return this.delta/1000}
    public get fps(){return this.delta != 0 ? (1000/this.delta) : 0}
    public constructor(protected onLoop: LoopHandler)
    {

    }
    public abstract start(): void
    public abstract stop(): void
    public restart()
    {
        this.stop()
        this.start()
    }
}

export class RAFLoop extends Loop
{
    private _id: number = NaN
    public get id(){return this._id}
    public start(): void 
    {
        this.requestAnimationFrame()
    }
    private requestAnimationFrame()
    {
        const func: FrameRequestCallback = (time) =>
        {
            this.lastTime = this.currentTime
            this.currentTime = time
            this.onLoop(this)
            this._id = requestAnimationFrame(func)
        }
        this._id = requestAnimationFrame(func)
    }
    public stop(): void 
    {
        cancelAnimationFrame(this._id)
    }
}

export class IntervalLoop extends Loop
{
    private _id: number = NaN
    public static FPS = 60
    public start(): void 
    {
        this._id = setInterval((time: number) =>
        {
            this.lastTime = this.currentTime
            this.currentTime = time
            this.onLoop(this)
        },1000/IntervalLoop.FPS,performance.now())
    }
    public stop(): void 
    {
        clearInterval(this._id)
    }
}

export class TimeoutLoop extends Loop
{
    private _id: number = NaN
    public static FPS = 60
    public start(): void 
    {
        const func = (time: number) =>
        {
            this.lastTime = this.currentTime
            this.currentTime = time
            this.onLoop(this)
            this._id = setTimeout(func,1000/TimeoutLoop.FPS,performance.now())
        }
        this._id = setTimeout(func,1000/TimeoutLoop.FPS,performance.now())
    }
    public stop(): void 
    {
        clearTimeout(this._id)
    }
}

export function createLoop(type: LoopType, handler: LoopHandler): Loop
{
    switch (type) 
    {
        case "requestAnimationFrame":
            return new RAFLoop(handler)
        case "setInterval":
            return new IntervalLoop(handler)
        case "setTimeout":
            return new TimeoutLoop(handler)
    }
}