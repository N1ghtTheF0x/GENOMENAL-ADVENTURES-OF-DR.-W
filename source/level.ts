import { ITile } from "./tile"
import { loadJSON } from "./utils"

export interface ILevel
{
    tiles: ReadonlyArray<ITile>
    hitboxes: ReadonlyArray<ILevel.IHitbox>
    water: boolean
}

export namespace ILevel
{
    
    export interface IHitbox
    {
        x: number
        y: number
        w: number
        h: number
        type: IHitbox.Type
    }
    export namespace IHitbox
    {
        export type Type = "plattform" | "hazard"
    }
}

export const loadLevel = (url: string) => loadJSON<ILevel>(url)