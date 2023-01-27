import GPUContext from "./context";
import { Feature, WebGL, WebGLError } from "./utils";

class Attribute extends Feature
{
    constructor(context: GPUContext,readonly location: number,readonly options: Attribute.Options)
    {
        super(context)
    }
    point()
    {
        this.gl.vertexAttribPointer(
            this.location,
            this.options.size,this.options.type,this.options.normalized,
            this.options.stride,this.options.offset
        )
    }
}

function createVertexArray<GL extends WebGL>(context: GPUContext<GL>)
{

}

namespace Attribute
{
    export interface Options
    {
        size: number
        type: number
        normalized: boolean
        stride: number
        offset: number
    }

    export type ArrayType = {
        "webgl": WebGLVertexArrayObjectOES
        "webgl2": WebGLVertexArrayObject
    }

    export class Array extends Feature
    {
        vao: WebGLVertexArrayObject
        constructor(context: GPUContext)
        {
            super(context)
            this.vao = this.context.is("webgl2") ? this.#init_webgl2() : this.#init_webgl()
        }
        #init_webgl2(): WebGLVertexArrayObject
        {
            if(this.context.is("webgl2"))
            {
                const gl = this.context.gl

                const vao = gl.createVertexArray()
                if(vao == null) throw new WebGLError('"createVertexArray" is null!')
                return vao
            }
            throw new WebGLError("Context is not webgl2!")
        }
        #init_webgl(): WebGLVertexArrayObject
        {
            if(this.context.is("webgl"))
            {
                const ext = this.gl.getExtension("OES_vertex_array_object")
                if(ext == null) throw new WebGLError("VertexArrayObject is not supported!")
                
            }
            throw new WebGLError("Context is not webgl!")
        }
    }
}

export default Attribute