export var playerUp = false
export var playerDown = false
export var playerRight = false
export var playerLeft = false
export var playerJump = 0
export var playerEnter = false

export var debugCameraLeft = false
export var debugCameraRight = false
export var debugCameraUp = false
export var debugCameraDown = false

export var mouseX = 0
export var mouseY = 0
function handleInput(ev: KeyboardEvent,state: boolean)
{
    switch(ev.code)
    {
        case "KeyW":
            playerUp = state
            break
        case "KeyS":
            playerDown = state
            break
        case "KeyA":
            playerLeft = state
            break
        case "KeyD":
            playerRight = state
            break
        case "Space":
            playerJump = state ? 1 : 0
            break
        case "Enter":
            playerEnter = state
            break
        case "ArrowUp":
            debugCameraUp = state
            break
        case "ArrowDown":
            debugCameraDown = state
            break
        case "ArrowLeft":
            debugCameraLeft = state
            break
        case "ArrowRight":
            debugCameraRight = state
            break
    }
}

export function setupInput()
{
    window.addEventListener("contextmenu",(ev) => ev.preventDefault())
    window.addEventListener("keyup",(ev) =>
    {
        ev.preventDefault()
        handleInput(ev,false)
    })
    window.addEventListener("keydown",(ev) =>
    {
        ev.preventDefault()
        handleInput(ev,true)
    })
    window.addEventListener("mousemove",(ev) =>
    {
        ev.preventDefault()
        mouseX += ev.movementX
        mouseY += ev.movementY
    })
    setInterval(() =>
    {
        const gamepad = navigator.getGamepads()[0]
        if(!gamepad) return

        const dz = 0.5

        playerJump = gamepad.buttons[0].value
        playerEnter = gamepad.buttons[9].pressed

        playerLeft = gamepad.axes[0] < -dz || gamepad.buttons[14].pressed
        playerRight = gamepad.axes[0] > dz || gamepad.buttons[15].pressed

        playerUp = gamepad.axes[1] < -dz || gamepad.buttons[12].pressed
        playerDown = gamepad.axes[1] > dz || gamepad.buttons[13].pressed
    })
}