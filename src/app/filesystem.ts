"use server";

import { promises as fs } from 'fs';
import path from 'path'
import {Recipe} from "@/app/common/types";

export async function getRecipes(item: string): Promise<Recipe[]>
{
	let files: string[] = await fs.readdir(path.join('./public/data/recipes'));
	files = files.filter(file => file.endsWith('.json') && file.includes(item));
	const recipes: Recipe[] = [];
	for (const file of files)
	{
		const recipe: Recipe = JSON.parse(await fs.readFile(path.join('./public/data/recipes', file), 'utf8'));
		if (recipe.output.item == item)
			recipes.push(recipe);
	}
	return recipes;
}