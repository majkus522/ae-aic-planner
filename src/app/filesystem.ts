"use server";

import { promises as fs } from 'fs';
import path from 'path'

export async function getRecipes(item: string)
{
	let files = await fs.readdir(path.join('./public/data/recipes'));
	files = files.filter(file => file.endsWith('.json') && file.includes(item));
	const data = files.map(async (file) => {
		const filePath = path.join('./public/data/recipes', file)
		const content = await fs.readFile(filePath, 'utf8')
		return JSON.parse(content)
	})
	console.log(data);
	return data;
}