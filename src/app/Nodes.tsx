import Image from "next/image";

type ItemNodeProps = {
	item: string;
	ratio: number;
	x?: number;
	y?: number;
};

type MachineNodeProps = {
	machine: string;
	usage: number;
	x?: number;
	y?: number;
};

export function ItemNode({item, ratio, x = 0, y = 0}: ItemNodeProps)
{
	return (
		<g className="factoryNode" transform={`translate(${x}, ${y})`} width="200" height="200">
			<rect width="100" height="100" x="0" y="0" fill="rgb(69,69,69)" ry="5" rx="5"></rect>
			<rect width="100" height="30" x="0" y="70" fill="rgb(245,245,245)" ry="5" rx="5"></rect>
			<image href={`images/items/${item}.webp`} alt={item} width="70" height="70" x="15" y="0"/>
			<text x="50" y="82.5" text-anchor="middle">{item}</text>
			<text x="50" y="95.5" text-anchor="middle">{ratio} / min</text>
		</g>
	);
}

export function MachineNode({machine, usage, x = 0, y = 0}: MachineNodeProps)
{
	return (
		<g className="factoryNode" transform={`translate(${x}, ${y})`} width="200" height="200">
			<rect width="100" height="100" x="0" y="0" fill="rgb(69,69,69)" ry="5" rx="5"></rect>
			<rect width="100" height="30" x="0" y="70" fill="rgb(245,245,245)" ry="5" rx="5"></rect>
			<image href={`images/machines/${machine}.webp`} alt={machine} width="70" height="70" x="15" y="0"/>
			<text x="50" y="82.5" text-anchor="middle">{machine}</text>
			<text x="50" y="95.5" text-anchor="middle">{usage}</text>
		</g>
	);
}