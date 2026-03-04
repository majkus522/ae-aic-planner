export class Vector2
{
    public x: number;
    public y: number;

    public constructor(x: number = 0, y: number = 0)
    {
        this.x = x;
        this.y = y;
    }

    public step(count: number, index: number): Vector2
    {
        if (count >= 2)
            return new Vector2(-300, index == 0 ? 150 : -150);
        return new Vector2(-300, 0);
    }

    public add(input: Vector2): Vector2
    {
        return new Vector2(this.x + input.x, this.y + input.y);
    }
}