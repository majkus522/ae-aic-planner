"use client"

import "./page.css"
import {JSX, useState} from "react";
import {GraphNode} from "@/app/Nodes";
import {Chain, Vector2} from "@/app/common";

const items: JSX.Element[] = [];

function display(chain: Chain, index: number, position: Vector2)
{
	if (chain.nodes[index] == null)
		return;
	const pos = chain.nodes[index].position.add(position);
	items.push(<GraphNode item={chain.nodes[index].item} amount={chain.nodes[index].amount} machine={chain.nodes[index].machine} usage={chain.nodes[index].usage} x={pos.x} y={pos.y} loop={chain.nodes[index].loop}/>)
	if (chain.nodes[index].left > 0)
		display(chain, chain.nodes[index].left, pos);
	if (chain.nodes[index].right > 0)
		display(chain, chain.nodes[index].right, pos);
}

export default function Home()
{
	const [chain, setChain] = useState<Chain>();

	return (
		<main>
			<section>
				<input type="button" value="Click" onClick={async function (){
					const chain = new Chain("sandleaf-powder", 60);
					await chain.eval();
					setChain(chain);
					while(items.length > 0)
						items.pop();
					display(chain, 0, new Vector2(1400, 0));
				}}/>
			</section>
			<section>
				<svg viewBox="0 -900 1500 1400" xmlns="http://www.w3.org/2000/svg">
					{items}
				</svg>
			</section>
		</main>
	);
}