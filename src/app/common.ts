import { getRecipes } from "@/app/filesystem";

export type ItemStack = {
	item: string;
	amount: number;
};

export type Recipe = {
	output: ItemStack;
	inputs: ItemStack[];
	time: number;
	machine: string;
};

export class Vector2
{
	public x: number;
	public y: number;

	public constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}

	public step(count: number, index: number): Vector2
	{
		if (count >= 2)
			return new Vector2(this.x - 300, this.y + (index == 0 ? 150 : -150));
		return new Vector2(this.x - 300, this.y);
	}
}

export class Chain
{
	public head: ChainLink;

	public constructor(item: string, amount: number)
	{
		this.head = new ChainLink(item, amount, new Vector2(1400, 0));
	}
}

export class ChainLink
{
	public item: string;
	public amount: number;
	public usage: number = 0;
	public position: Vector2;
	public machine: string = "";
	left?: ChainLink | undefined;
	right?: ChainLink | undefined;
	movedAlready: boolean = false;

	public constructor(item: string, amount: number, position: Vector2)
	{
		this.item = item;
		this.amount = amount;
		this.position = position;
	}

	public async eval(parent: ChainLink | undefined)
	{
		const recipes: Recipe[] = await getRecipes(this.item);
		if (recipes.length == 0) return;
		const recipe: Recipe = recipes[0];
		this.machine = recipe.machine;
		this.usage = ((this.amount / recipe.output.amount) * recipe.time) / 60;
		if (recipe.inputs != null)
		{
			if (recipe.inputs.length >= 2 && this.position.y != 0)
			{
				this.position.y += (this.position.y > 0 ? 150 : -150);
				console.log(this.item);
				await parent?.moveUp();
			}
			if (recipe.inputs[0] != null)
			{
				this.left = new ChainLink(recipe.inputs[0].item, (this.amount / recipe.output.amount) * recipe.inputs[0].amount, this.position.step(recipe.inputs.length, 0));
				await this.left.eval(this);
			}
			if (recipe.inputs[1] != null)
			{
				this.right = new ChainLink(recipe.inputs[1].item, (this.amount / recipe.output.amount) * recipe.inputs[1].amount, this.position.step(recipe.inputs.length, 1));
				await this.right.eval(this);
			}
		}
	}

	public async moveUp()
	{
		if (this.position.y != 0)
			this.position.y += ((this.position.y > 0 ? 150 : -150) * (this.movedAlready ? 0.5 : 1));
		this.movedAlready = true;
	}
}