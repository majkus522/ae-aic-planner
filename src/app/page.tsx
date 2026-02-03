"use client"

import "./page.css"
import {getRecipes} from "@/app/filesystem";
import {useState} from "react";
import {ItemNode, MachineNode} from "@/app/Nodes";

export default function Home()
{
	const [data, setData] = useState();

	return (
		<main>
			<section>
				<input type="number" onChange={async function (){
					setData(JSON.stringify(await getRecipes("amethyst-powder")));
				}}/>
			</section>
			<section>
				<svg viewBox="0 0 994 600" xmlns="http://www.w3.org/2000/svg">
					<ItemNode item="amethyst-ore" ratio={10}></ItemNode>
					<MachineNode machine="refining-unit" usage={10} x={150}></MachineNode>
					<ItemNode item="amethyst-fiber" ratio={10} x={300}></ItemNode>
					<MachineNode machine="shredding-unit" usage={10} x={450}></MachineNode>
					<ItemNode item="amethyst-powder" ratio={10} x={600}></ItemNode>
				</svg>
			</section>
			<section>
				{data}
			</section>
		</main>
	);
}
