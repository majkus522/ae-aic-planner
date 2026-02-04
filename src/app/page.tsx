"use client"

import "./page.css"
import {JSX, useState} from "react";
import {ItemNode, MachineNode} from "@/app/Nodes";
import {Chain, ChainLink} from "@/app/common";

let items: JSX.Element[] = [];
let index = 0;

function display(node: ChainLink | undefined)
{
	if (node == null)
		return;
	items.push(<ItemNode item={node.item} ratio={node.amount} x={node.position.x} y={node.position.y} key={index} />);
	items.push(<MachineNode machine={node.machine} usage={node.usage} x={node.position.x - 150} y={node.position.y} key={index + 1} />);
	index += 2;
	display(node.left);
	index += 2;
	display(node.right);
}

export default function Home()
{
	const [chain, setChain] = useState<Chain>();
	display(chain?.head);

	return (
		<main>
			<section>
				<input type="button" value="Click" onClick={async function (){
					let chain = new Chain("cryston-powder", 30);
					await chain.head.eval();
					setChain(chain);
					while(items.length > 0)
						items.pop();
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