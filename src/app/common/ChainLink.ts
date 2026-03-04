import {ProductionChain} from "./ProductionChain";
import {Vector2} from "./Vector2";
import {getRecipes} from "@/app/filesystem";
import {Recipe} from "./types";

export class ChainLink
{
    public item: string;
    public amount: number;
    public usage: number = 0;
    public position: Vector2;
    public machine: string = "";
    public left: number = -1;
    public right: number = -1;
    public loop: boolean = false;
    private movedAlready: boolean = false;
    private parent: number = -1;

    public constructor(item: string, amount: number, position: Vector2)
    {
        this.item = item;
        this.amount = amount;
        this.position = position;
    }

    public async eval(chain: ProductionChain, index: number, parent: number, side: boolean, products: {item: string, node: number}[])
    {
        const recipes: Recipe[] = await getRecipes(this.item);
        if (recipes.length == 0) return;
        const recipe: Recipe = recipes[0];
        this.machine = recipe.machine;
        this.parent = parent;
        this.usage = ((this.amount / recipe.output.amount) * recipe.time) / 60;
        const loops = products.filter(product => product.item == this.item);
        if (loops.length > 0)
        {
            const ratio = chain.nodes[loops[0].node]?.amount / (chain.nodes[loops[0].node]?.amount + chain.nodes[loops[0].node]?.amount / ((chain.nodes[loops[0].node]?.amount / this.amount) - 1));
            let lIndex = index;
            while (lIndex != loops[0].node)
            {
                await chain.nodes[lIndex].reeval(ratio);
                lIndex = chain.nodes[lIndex].parent;
            }
            await chain.nodes[lIndex].reeval(ratio);
            this.loop = true;
            return;
        }
        products.push({item: this.item, node: index});
        if (recipe.inputs != null)
        {
            if (recipe.inputs.length >= 2 && this.parent > 0)
            {
                this.position.y *= 1.5;
                await chain.nodes[parent].moveUp(side, index);
            }
            if (recipe.inputs[0] != null)
            {
                this.left = chain.nodes.push(new ChainLink(recipe.inputs[0].item, (this.amount / recipe.output.amount) * recipe.inputs[0].amount, this.position.step(recipe.inputs.length, 0))) - 1;
                await chain.nodes[this.left].eval(chain, this.left, index, parent >= 0 ? side : false, structuredClone(products));
            }
            if (recipe.inputs[1] != null)
            {
                this.right = chain.nodes.push(new ChainLink(recipe.inputs[1].item, (this.amount / recipe.output.amount) * recipe.inputs[1].amount, this.position.step(recipe.inputs.length, 1))) - 1;
                await chain.nodes[this.right].eval(chain, this.right, index, parent >= 0 ? side : true, structuredClone(products));
            }
        }
    }

    public async moveUp(side: boolean, from: number)
    {
        const base = from == this.right ? 150 : 300
        const mult = side ? -1 : 1;
        if (this.parent > 0 && !this.movedAlready)
            this.position.y += base * mult;
        this.movedAlready = true;
    }

    public async reeval(ratio: number)
    {
        this.amount /= ratio;
        this.usage /= ratio;
    }
}