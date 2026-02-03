"use client"

import "./page.css"
import {JSX, useState} from "react";
import {ItemNode, MachineNode} from "@/app/Nodes";
import {Chain, ChainLink} from "@/app/common";

export default function Home()
{
	const [chain, setChain] = useState<Chain>();

	const items: JSX.Element[] = [];
	let node: ChainLink | undefined = chain?.head;
	let x = 1000;
	while (node != null)
	{
		items.push(<ItemNode item={node.item} ratio={node.amount} x={x} key={`item-${node.item}-${x}`} />);
		items.push(<MachineNode machine={node.recipe.machine} usage={node.usage} x={x - 150} key={`machine-${node.recipe.machine}-${x}`} />);
		x -= 300;
		node = node.left;
	}

	return (
		<main>
			<section>
				<input type="button" value="Click" onClick={async function (){
					let chain = new Chain("cryston-powder", 30);
					await chain.head.eval();
					setChain(chain);
				}}/>
			</section>
			<section>
				{JSON.stringify(chain)}
			</section>
			<section>
				<svg viewBox="0 0 1500 700" xmlns="http://www.w3.org/2000/svg">
					{items}
				</svg>
			</section>
		</main>
	);
}