import { isEmbedded } from "./utils"

(async () =>
{
    if(isEmbedded()) throw new Error("Game cannot be embedded! Go to the orignal page!")
    const Game = (await import("./game")).default

    Game.Instance.start()
})()