import { bakeImage, clear, drawImage, noHitbox } from "./canvas"

import MainTilesPicture from "./textures/tilesheet.png"
import { loadImage } from "./utils"

export class ETileSet
{
    public constructor(public w: number,public h: number,public source: CanvasImageSource)
    {

    }
    public drawTile(x: number,y: number,tx: number,ty: number)
    {
        const tileX = tx * this.w
        const tileY = ty * this.h
        noHitbox(() => drawImage(this.source,x,y,{
            sx: tileX,sy: tileY,sw: this.w,sh: this.h,w: this.w,h: this.h
        }))
    }
    public drawTiles(tiles: ReadonlyArray<ITile>)
    {
        for(const tile of tiles)
            this.drawTile(tile.x*this.w,tile.y*this.h,tile.tx,tile.ty)
    }
    public bakeTiles(tiles: ReadonlyArray<ITile>)
    {
        clear()
        return bakeImage(() => this.drawTiles(tiles),...this.getMaxTileSize(tiles))
    }
    private getMaxTileSize(tiles: ReadonlyArray<ITile>)
    {
        const tileX = tiles.toSorted((a,b) => a.x - b.x).at(-1) as ITile
        const tileY = tiles.toSorted((a,b) => a.y - b.y).at(-1) as ITile
        return [tileX.x * this.w,tileY.x * this.h]
    }
}


export interface ITile
{
    x: number
    y: number
    tx: number
    ty: number
}

export const mainTiles = new ETileSet(17,17,await loadImage(MainTilesPicture))