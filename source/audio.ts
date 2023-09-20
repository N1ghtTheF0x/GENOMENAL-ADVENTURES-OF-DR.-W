import { options } from "./options"

export class EAudio
{
    private _audio: HTMLAudioElement
    public get loop(){return this._audio.loop}
    public set loop(val){this._audio.loop = val}
    public get time(){return this._audio.currentTime}
    public set time(val){this._audio.currentTime = val/1000}
    public get stopped(){return this.paused && this.time == 0}
    public get paused(){return this._audio.paused}
    public get playing(){return !this._audio.paused}
    public constructor(public readonly source: string,loop = false)
    {
        this._audio = new Audio(source)
        this.loop = loop
    }
    public async play(ms = 0)
    {
        if(options.mute) return
        try
        {
            this.time = ms
            await this._audio.play()
        }
        catch(e)
        {
            console.error(new Error(`Couldn't play audio: ${this.source}`,{cause: e}))
        }
    }
    public pause()
    {
        this._audio.pause()
    }
    public stop()
    {
        this.pause()
        this.time = 0
    }
}