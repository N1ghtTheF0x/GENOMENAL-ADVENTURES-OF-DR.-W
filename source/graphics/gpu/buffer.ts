import GPUContext from "./context";
import { Feature, WebGL, WebGLError } from "./utils";

class Buffer extends Feature
{
    buffer: WebGLBuffer
    target: number
    usage: number
    constructor(context: GPUContext,target: number,usage: number)
    {
        super(context)
        this.target = target,this.usage = usage
        const buffer = this.gl.createBuffer()
        if(buffer == null) throw new WebGLError('"createBuffer" is null')
        this.buffer = buffer
    }
    bind()
    {
        this.gl.bindBuffer(this.target,this.buffer)
    }
    data(data: BufferSource)
    {
        this.gl.bufferData(this.target,data,this.usage)
    }
}

export default Buffer