import Canvas from "../canvas";
import Context from "../context";
import CanvasItem from "../item";
import { RenderingContextType, WebGL } from "./utils";
import Buffer from "./buffer";
import Shader from "./shader";
import Program from "./program";

function getContext(canvas: HTMLCanvasElement): [WebGL,keyof RenderingContextType]
{
    function webgl()
    {
        const gl = canvas.getContext("webgl")
        if(gl === null) throw new Error("WebGL is not supported on this machine!")
        return gl
    }
    function webgl2()
    {
        const gl = canvas.getContext("webgl2")
        if(gl === null) throw new Error("WebGL2 is not supported on this machine!")
        return gl
    }
    if(Canvas.checkContext("webgl2")) return [webgl2(),"webgl2"]
    else if(Canvas.checkContext("webgl")) return [webgl(),"webgl"]
    else throw new Error("Your machine doesn't support any kind of WebGL!")
}

class GPUContext<Type extends keyof RenderingContextType = keyof RenderingContextType> extends Context
{
    gl: RenderingContextType[Type]
    shader: Shader
    program: Program
    readonly type: Type
    constructor(canvas: HTMLCanvasElement)
    {
        super(canvas)
        const [gl,type] = getContext(canvas)
        this.gl = gl as RenderingContextType[Type]
        this.type = type as Type
    }
    createBuffer(target: number,usage: number)
    {
        return new Buffer(this,target,usage)
    }
    init() 
    {
        
    }
    draw(...items: CanvasItem[]): void 
    {
        
    }
    clear(): void 
    {
        this.gl.clearColor(0,0,0,0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }
    is<T extends keyof RenderingContextType>(type: T): this is GPUContext<T>
    {
        return this.type == type
    }
}

export default GPUContext