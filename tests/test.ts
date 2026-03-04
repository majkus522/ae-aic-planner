import test from 'ava';
import {promises as fs, existsSync} from "fs";
import path from "path";
import {ItemData, MachineData, Recipe} from "@/app/common/types";

async function main()
{
    const recipes: string[] = (await fs.readdir(path.join('./public/data/recipes'))).filter(file => file.endsWith('.json'));
    const items: string[] = (await fs.readdir(path.join('./public/data/items'))).filter(file => file.endsWith('.json'));
    const machines: string[] = (await fs.readdir(path.join('./public/data/machines'))).filter(file => file.endsWith('.json'));

    await testItems(items);
    await testMachines(machines);
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
            if (!items.includes(recipe.output.item + ".json"))
                t.fail("Ouput item doesn't exist");
            if (recipe.inputs != undefined)
            {
                for (let index = 0; index < recipe.inputs.length; index++)
                    if (!items.includes(recipe.inputs[index].item + ".json"))
                        t.fail("Input item " + index + " doesn't exist");
            }
            if (!machines.includes(recipe.machine + ".json"))
                t.fail("Machine doesn't exist");
            t.pass();
        });
    }
}

async function testItems(items: string[])
{
    for (const file of items)
    {
        test(file, async (t) => {
            const data: ItemData = JSON.parse(await fs.readFile(path.join('./public/data/items', file), 'utf8'));
            if (data.name.length <= 0)
                t.fail("Missing item name");
            if (data.description.length <= 0)
                t.fail("Missing item description");
            t.is(existsSync("./public/images/items/" + file.slice(0, -5) + ".png"), true, "Missing image");
        });
    }
}

async function testMachines(machines: string[])
{
    for (const file of machines)
    {
        test(file, async (t) => {
            const data: MachineData = JSON.parse(await fs.readFile(path.join('./public/data/machines', file), 'utf8'));
            if (data.name.length <= 0)
                t.fail("Missing machine name");
            if (data.description.length <= 0)
                t.fail("Missing machine description");
            if (data.power <= 0)
                t.fail("Incorrect power usage")
            t.is(existsSync("./public/images/machines/" + file.slice(0, -5) + ".png"), true, "Missing image");
        });
    }
}

main();