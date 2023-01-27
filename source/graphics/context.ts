import CanvasItem from "./item";

abstract class Context
{
    drawHitbox: boolean = false
    constructor(readonly canvas: HTMLCanvasElement)
    {
        
    }
    abstract draw(...items: CanvasItem[]): void
    abstract clear(): void
}

export default Context