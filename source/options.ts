export const STORAGE_OPTIONS_ID = "iGEM-GAODW"

export class OptionsManager implements IOptions
{
    public constructor(public mute: boolean = false,public drawHitbox: boolean = false,public sonic: boolean = false)
    {
        if(!this.load()) this.save()
    }
    public load()
    {
        if(!localStorage) return false
        try
        {
            const obj = JSON.parse(localStorage.getItem(STORAGE_OPTIONS_ID) ?? "") as IOptions
            this.mute = obj.mute
            this.drawHitbox = obj.drawHitbox
            this.sonic = obj.sonic
        }
        catch(e)
        {
            console.error(new Error(`Couldn't load Options`))
            return false
        }
        return true
    }
    public save()
    {
        if(!localStorage) return false
        try
        {
            localStorage.setItem(STORAGE_OPTIONS_ID,JSON.stringify(this.toJSON(),null,4))
        }
        catch(e)
        {
            console.error(new Error(`Couldn't create Options`))
            return false
        }
        return true
    }
    public toJSON()
    {
        return {mute: this.mute,drawHitbox: this.drawHitbox,sonic: this.sonic}
    }
}

export interface IOptions
{
    mute: boolean
    drawHitbox: boolean
    sonic: boolean
}

export const options = new OptionsManager()