import test from 'ava';
import {promises as fs} from "fs";
import path from "path";
import {Recipe} from "@/app/common/types";

async function main()
{
    const recipes: string[] = (await fs.readdir(path.join('./public/data/recipes'))).filter(file => file.endsWith('.json'));
    const items: string[] = (await fs.readdir(path.join('./public/data/items'))).filter(file => file.endsWith('.json'));
    const machines: string[] = (await fs.readdir(path.join('./public/data/machines'))).filter(file => file.endsWith('.json'));

    await testItems();
    await testMachines();
    await testRecipes(recipes, items, machines);
}

async function testRecipes(recipes: string[], items: string[], machines: string[])
{
    for (const file of recipes)
    {
        test(file, async (t) => {
            const recipe: Recipe = JSON.parse(await fs.readFile(path.join('./public/data/recipes', file), 'utf8'));
            if (!file.includes(recipe.output.item))
                t.fail("Incorrect file name");
            if (recipe.time <= 0)
                t.fail("Incorrect recipe time");
            //TODO: test if item exists
            //TODO: test if machine exists
        });
    }
}

async function testItems()
{
    //TODO: test items
}

async function testMachines()
{
    //TODO: test machines
}

main();