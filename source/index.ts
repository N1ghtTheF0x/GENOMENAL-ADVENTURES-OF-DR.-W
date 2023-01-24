import { isEmbedded } from "./utils"
import Game from "./game"

(async () =>
{
    if(isEmbedded()) throw new Error("Game cannot be embedded! Go to the orignal page!")

    Game.Instance.start()
})()