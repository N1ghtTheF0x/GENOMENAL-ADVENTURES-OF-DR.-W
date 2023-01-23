class EAudio
{
    static create(source: string,loop: boolean = false)
    {
        return new this(new Audio(source),loop)
    }
    static MUTE = false
    #context: AudioContext = new AudioContext()
    #track: MediaElementAudioSourceNode
    #html: HTMLMediaElement
    #stopped: boolean = false
    get paused() { return this.#html.paused }
    get playing() { return !this.#html.paused }
    get stopped() { return this.#stopped }
    constructor(html: HTMLMediaElement,loop: boolean = false)
    {
        this.#html = html
        this.#html.loop = loop
        this.#track = this.#context.createMediaElementSource(this.#html)
        this.#track.connect(this.#context.destination)
    }
    async #checkAutoPlay()
    {
        if(this.#context.state == "suspended") await this.#context.resume()
    }
    async play()
    {
        if(EAudio.MUTE) return

        await this.#checkAutoPlay()

        await this.#html.play()

        this.#stopped = false
    }
    async pause()
    {
        await this.#checkAutoPlay()

        this.#html.pause()

        this.#stopped = false
    }
    async stop()
    {
        await this.pause()
        this.#html.currentTime = 0

        this.#stopped = true
    }
}

export default EAudio