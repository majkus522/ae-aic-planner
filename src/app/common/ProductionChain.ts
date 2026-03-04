import {Vector2} from "./Vector2";
import {ChainLink} from "./ChainLink";

export class ProductionChain
{
    public nodes: ChainLink[];

    public constructor(item: string, amount: number)
    {
        this.nodes = [];
        this.nodes.push(new ChainLink(item, amount, new Vector2()));
    }

    public async eval()
    {
        await this.nodes[0].eval(this, 0, -1, false, []);
    }
}