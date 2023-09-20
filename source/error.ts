export class AlertError extends Error
{
    public constructor(...args: ConstructorParameters<ErrorConstructor>)
    {
        super(...args)
        alert(this.toString())
    }
}