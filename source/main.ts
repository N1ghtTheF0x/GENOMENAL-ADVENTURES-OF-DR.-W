import { canvas, clear, ctx, drawText, offset, setupCanvas, toggleCursor } from "./canvas"
import { debugCameraDown, debugCameraLeft, debugCameraRight, debugCameraUp, mouseX, mouseY, playerDown, playerLeft, playerRight, playerUp, setupInput } from "./input"
import { Loop, createLoop } from "./loop"
import { EObject } from "./object"
import { options } from "./options"
import { ITile, mainTiles } from "./tile"
import { makeGlobal } from "./utils"

setupCanvas(canvas)
setupInput()

const tiles: Array<ITile> = []

for(var x = 0;x < 200;x++)
    for(var y = 0;y < 200;y++)
        tiles.push({x,y,tx: 0,ty: 2})

const bakedTiles = await mainTiles.bakeTiles(tiles)
const bakedTileObject = new EObject.Image(0,0,bakedTiles)

const player = new EObject.Rect(0,0,30,60,{style: "fill",value: "blue"})
const obj2 = new EObject.Rect(500,600,200,200,{style: "fill",value: "red"})
const cursor = new EObject.Rect(mouseX,mouseY,10,10,{style: "fill"})

const group = new EObject.Group(bakedTileObject,player,obj2)

const spd = 600
const screenOffset = 500

function update(loop: Loop) 
{
    cursor.x = mouseX,cursor.y = mouseY
    if (playerLeft) player.x -= spd * loop.deltaTime
    if (playerRight) player.x += spd * loop.deltaTime
    if (playerUp) player.y -= spd * loop.deltaTime
    if (playerDown) player.y += spd * loop.deltaTime

    if(player.screenY <= screenOffset + player.h) offset.y += spd * loop.deltaTime
    if(player.screenY >= canvas.height - screenOffset - player.h) offset.y -= spd * loop.deltaTime
    if(player.screenX >= canvas.width - screenOffset - player.w) offset.x -= spd * loop.deltaTime
    if(player.screenX <= screenOffset + player.w) offset.x += spd * loop.deltaTime

    player.options.value = player.isMouseOver() ? "green" : "blue"
}

async function frame(loop: Loop) 
{
    clear()
    update(loop)
    group.draw()
    debugText(loop)
    cursor.draw()
}

const loop = createLoop("requestAnimationFrame",frame)

loop.start()

// DEBUG

makeGlobal(canvas,"canvas")
makeGlobal(ctx,"ctx")
makeGlobal(mainTiles,"mainTiles")
makeGlobal(group,"group")
makeGlobal(options,"options")
makeGlobal(EObject.CurrentlyDrawing,"curDrawing")

function debugText(loop: Loop) 
{
    drawText(0, 0, `${loop.fps | 0} FPS`, { value: "red", font: "33px monospace", style: "fill", static: true })
    drawText(0, 33,`OFFSET X ${offset.x.toFixed(2)}`, { style: "fill", font: "33px monospace", static: true})
    drawText(0, 33*2,`OFFSET Y ${offset.y.toFixed(2)}`, { style: "fill", font: "33px monospace", static: true})
    drawText(0, 33*3,cursor.collides(player),{value: "red", font: "33px monospace", style: "fill", static: true})
    drawText(0, 33*4,`MOUSE X ${mouseX.toFixed(2)}`, { style: "fill", font: "33px monospace", static: true})
    drawText(0, 33*5,`MOUSE Y ${mouseY.toFixed(2)}`, { style: "fill", font: "33px monospace", static: true})
}

window.addEventListener("click",() => toggleCursor())

