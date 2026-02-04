type GraphNodeProps = {
	item: string;
	amount: number;
	machine: string;
	usage: number;
	x: number;
	y: number;
	loop: boolean;
};

export function GraphNode({item, amount, machine, usage, x, y, loop}: GraphNodeProps)
{
	const nodes = [BasicNode(`images/items/${item}.webp`, item, amount + " / min", x, y)];
	if (!loop)
		nodes.push(BasicNode(`images/machines/${machine}.webp`, machine, String(usage), x - 150, y))
	return <>{nodes}</>;
}

function BasicNode(image: string, name: string, desc: string, x: number, y: number)
{
	return (
		<g className="factoryNode" transform={`translate(${x}, ${y})`} width="200" height="200">
			<rect width="100" height="100" x="0" y="0" fill="rgb(69,69,69)" ry="5" rx="5"></rect>
			<rect width="100" height="30" x="0" y="70" fill="rgb(245,245,245)" ry="5" rx="5"></rect>
			<image href={image} width="70" height="70" x="15" y="0"/>
			<text x="50" y="82.5" textAnchor="middle">{name}</text>
			<text x="50" y="95.5" textAnchor="middle">{desc}</text>
		</g>
	);
}