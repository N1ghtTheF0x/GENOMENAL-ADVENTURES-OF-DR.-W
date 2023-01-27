import GPUContext from "./context";
import Shader from "./shader";
import { Feature, WebGL, WebGLError } from "./utils";

function createProgram(gl: WebGL,vS: WebGLShader,fS: WebGLShader)
{
    const program = gl.createProgram()
    if(program == null) throw new WebGLError('"createProgram" is null!')
    gl.attachShader(program,vS)
    gl.attachShader(program,fS)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program,gl.LINK_STATUS)
    if(success) return program
    const infoLog = gl.getProgramInfoLog(program) ?? "Couldn't link Program!"
    gl.deleteProgram(program)
    throw new WebGLError(infoLog)
}

class Program extends Feature
{
    readonly program: WebGLProgram
    constructor(context: GPUContext,readonly shader: Shader)
    {
        super(context)
        this.program = createProgram(this.gl,shader.vertex,shader.fragment)
    }
    use()
    {
        this.gl.useProgram(this.program)
    }
    getAttribLocation(name: string)
    {
        return this.gl.getAttribLocation(this.program,name)
    }
    getUniformLocation(name: string)
    {
        const location = this.gl.getUniformLocation(this.program,name)
        if(location == null) throw new WebGLError(`No such Uniform Location: "${name}"!`)
        return location
    }
}

export default Program