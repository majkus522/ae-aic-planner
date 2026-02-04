"use client"

import "./page.css"
import {JSX, useState} from "react";
import {ItemNode, MachineNode} from "@/app/Nodes";
import {Chain, ChainLink} from "@/app/common";

const items: JSX.Element[] = [];

function display(chain: Chain, index: number)
{
	console.log(index);
	console.log(chain);
	if (chain.nodes[index] == null)
		return;
	items.push(<ItemNode item={chain.nodes[index].item} ratio={chain.nodes[index].amount} x={chain.nodes[index].position.x} y={chain.nodes[index].position.y} key={`${index}-item`} />);
	items.push(<MachineNode machine={chain.nodes[index].machine} usage={chain.nodes[index].usage} x={chain.nodes[index].position.x - 150} y={chain.nodes[index].position.y} key={`${index}-machine`} />);
	console.log(chain.nodes[index].left, chain.nodes[index].right);
	if (chain.nodes[index].left > 0)
		display(chain, chain.nodes[index].left);
	if (chain.nodes[index].right > 0)
		display(chain, chain.nodes[index].right);
}

export default function Home()
{
	const [chain, setChain] = useState<Chain>();

	return (
		<main>
			<section>
				<input type="button" value="Click" onClick={async function (){
					let chain = new Chain("cryston-powder", 30);
					await chain.eval();
					setChain(chain);
					while(items.length > 0)
						items.pop();
					display(chain, 0);
				}}/>
			</section>
			<section>
				{JSON.stringify(chain)}
			</section>
			<section>
				<svg viewBox="0 -700 1500 1400" xmlns="http://www.w3.org/2000/svg">
					{items}
				</svg>
			</section>
		</main>
	);
}