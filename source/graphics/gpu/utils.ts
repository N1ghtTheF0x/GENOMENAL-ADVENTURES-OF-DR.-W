import { CustomError } from "../../utils"
import GPUContext from "./context"

export class WebGLError extends CustomError
{
    constructor(message?: string,options?: ErrorOptions)
    {
        super("WebGLError",message,options)
    }
}

export type WebGL = WebGL2RenderingContext | WebGLRenderingContext

export type RenderingContextType = {
    "webgl": WebGLRenderingContext
    "webgl2": WebGL2RenderingContext
}

export abstract class Feature
{
    get gl() {return this.context.gl}
    constructor(readonly context: GPUContext)
    {
        
    }
}