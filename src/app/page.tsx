"use client"

import "./page.css"
import {JSX, useRef, useState} from "react";
import {GraphNode} from "@/app/Nodes";
import {Vector2} from "@/app/common/Vector2";
import {ProductionChain} from "@/app/common/ProductionChain";

const items: JSX.Element[] = [];

function display(chain: ProductionChain, index: number, position: Vector2)
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
	const [chain, setChain] = useState<ProductionChain>();
	const svgRef = useRef(null);
	const [startPos, setStartPos] = useState<Vector2>(new Vector2(0, 0));
	const [pos, setPos] = useState<Vector2>(new Vector2(0, 0));
	const [dragging, setDragging] = useState<boolean>(false);

	const getSVGPoint = (event) => {
		const svg = svgRef.current;
		const pt = svg.createSVGPoint();
		pt.x = event.clientX;
		pt.y = event.clientY;
		return pt.matrixTransform(svg.getScreenCTM().inverse());
	};

	const handleMouseMove = (event) => {
		if (!dragging)
			return;
		const coords = getSVGPoint(event);
		console.log(startPos.add(new Vector2(-coords.x, -coords.y)));
		setPos(pos.add(startPos.add(new Vector2(-coords.x, -coords.y))));
		setStartPos(new Vector2(coords.x, coords.y));
	};

	const startDragging = (event) => {
		setDragging(true);
		const coords = getSVGPoint(event);
		setStartPos(new Vector2(coords.x, coords.y));
	};

	return (
		<main>
			<section>
				<input type="button" value="Click" onClick={async function (){
					const chain = new ProductionChain("sandleaf-powder", 60);
					await chain.eval();
					setChain(chain);
					while(items.length > 0)
						items.pop();
					display(chain, 0, new Vector2(1400, 0));
					setPos(new Vector2(0, 0));
				}}/>
			</section>
			<section>
				<svg ref={svgRef} viewBox="0 -900 1500 1400" xmlns="http://www.w3.org/2000/svg" onMouseMove={handleMouseMove} onMouseUp={() => setDragging(false)} onMouseDown={startDragging}>
					<g transform={`translate(${-pos.x}, ${-pos.y})`}>
						{items}
					</g>
				</svg>
			</section>
		</main>
	);
}