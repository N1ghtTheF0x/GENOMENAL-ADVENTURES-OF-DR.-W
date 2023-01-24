import Game from "../game"
import CanvasItem from "../graphics/item"
import { Size, Vector2 } from "../math"

function default_GOptions(): NObject.GOptions
{
    return {
        mode: "fill",
        style: "black"
    }
}

class NObject
{
    static List: Map<NObject["id"],NObject> = new Map()
    static ID_COUNT = 0
    static #assignID()
    {
        this.ID_COUNT++
        return this.ID_COUNT
    }
    readonly id = NObject.#assignID()

    position: Vector2
    size: Size

    speed: Vector2 = Vector2(0,0)
    gSpeed: number = 0

    gType: NObject.GType = "none"

    gOptions: NObject.GOptions = default_GOptions()
    constructor(readonly type: NObject.Type,pos: Vector2,s: Size)
    {
        NObject.List.set(this.id,this)
        this.position = pos,this.size = s
    }
    process(game: Game)
    {
        
    }
}

namespace NObject
{
    export const ACC = 0.046875
    export const DEC = 0.5
    export const FRC = 0.046875
    export const TOP = 6
    export const AIR = 0.09375
    export const JMP = 6.5
    export const GRV = 0.21875
    export enum Type
    {
        Solid,
        Ghost,
        Rigidbody
    }
    export type GType = "none" | "image" | "rectangle"

    export interface GOptions 
    {
        mode: CanvasItem.Mode
        style: CanvasItem.Style        
    }
}

export default NObject