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

export class Chain
{
	public head: ChainLink;

	public constructor(item: string, amount: number)
	{
		this.head = new ChainLink(item, amount);
	}
}

export class ChainLink
{
	public item: string;
	public amount: number;
	public usage: number = 0;
	recipe: Recipe;
	left?: ChainLink | undefined;
	right?: ChainLink | undefined;

	public constructor(item: string, amount: number)
	{
		this.item = item;
		this.amount = amount;
	}

	public async eval()
	{
		const recipes: Recipe[] = await getRecipes(this.item);
		if (recipes.length == 0) return;
		this.recipe = recipes[0];
		this.usage = ((this.amount / this.recipe.output.amount) * this.recipe.time) / 60;
		if (this.recipe.inputs != null)
		{
			if (this.recipe.inputs[0] != null)
			{
				this.left = new ChainLink(this.recipe.inputs[0].item, (this.amount / this.recipe.output.amount) * this.recipe.inputs[0].amount,);
				await this.left.eval();
			}
			if (this.recipe.inputs[1] != null)
			{
				this.right = new ChainLink(this.recipe.inputs[1].item, (this.amount / this.recipe.output.amount) * this.recipe.inputs[1].amount,);
				await this.right.eval();
			}
		}
	}
}