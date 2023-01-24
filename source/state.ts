import Game from "./game";
import CanvasItem from "./graphics/item";
import { Vector2 } from "./math";

abstract class State
{
    abstract init(game: Game): boolean
    abstract update(game: Game): void
    abstract input(game: Game): void
    abstract draw(game: Game): void
}

namespace State
{
    export class Test extends State
    {
        speed = 200
        rotation = 0
        pos: Vector2 = Vector2(0,0)

        down = false
        up = false
        left = false
        right = false

        rotUp = false
        rotDown = false
        init()
        {
            return true
        }
        update(game: Game): void 
        {
            if(this.up) this.pos.y -= game.delta * this.speed
            if(this.down) this.pos.y += game.delta * this.speed
            if(this.left) this.pos.x -= game.delta * this.speed
            if(this.right) this.pos.x += game.delta * this.speed

            if(this.rotDown) this.rotation -= game.delta * 5
            if(this.rotUp) this.rotation += game.delta * 5
        }
        input(game: Game): void 
        {
            this.down = game.Input.keyboard["arrowdown"]
            this.up = game.Input.keyboard["arrowup"]
            this.left = game.Input.keyboard["arrowleft"]
            this.right = game.Input.keyboard["arrowright"]

            this.rotDown = game.Input.keyboard["q"]
            this.rotUp = game.Input.keyboard["e"]
        }
        draw(game: Game): void 
        {
            game.Canvas.clear()

            const item = new CanvasItem.Rectangle({width: 30,height: 30,...this.pos},"red","fill")
            item.rotationDeg = this.rotation

            game.Canvas.draw(item)
        }
    }
}

export default State