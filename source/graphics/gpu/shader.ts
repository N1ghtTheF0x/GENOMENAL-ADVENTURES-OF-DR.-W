import GPUContext from "./context"
import { Feature, WebGL, WebGLError } from "./utils"

import WebGLVertexSource from "./shaders/webgl1.vert"
import WebGLFragmentSource from "./shaders/webgl1.frag"

import WebGL2VertexSource from "./shaders/webgl2.vert"
import WebGL2FragmentSource from "./shaders/webgl2.frag"

function createShader(gl: WebGL,type: number,source: string)
{
    const shader = gl.createShader(type)
    if(shader == null) throw new WebGLError('"createShader" is null!')
    gl.shaderSource(shader,source)
    gl.compileShader(shader)

    const success = gl.getShaderParameter(shader,gl.COMPILE_STATUS)
    if(success) return shader
    const infoLog = gl.getShaderInfoLog(shader) ?? "Couldn't compile Shader!"
    gl.deleteShader(shader)
    throw new WebGLError(infoLog)
}

function vertexSource(context: GPUContext)
{
    return context.is("webgl2") ? WebGL2VertexSource : WebGLVertexSource
}

function fragmentSource(context: GPUContext)
{
    return context.is("webgl2") ? WebGL2FragmentSource : WebGLFragmentSource
}

class Shader extends Feature
{
    readonly vertex: WebGLShader
    readonly fragment: WebGLShader
    constructor(context: GPUContext)
    {
        super(context)
        this.vertex = createShader(this.gl,this.gl.VERTEX_SHADER,vertexSource(context))
        this.fragment = createShader(this.gl,this.gl.FRAGMENT_SHADER,fragmentSource(context))
    }
}

export default Shader