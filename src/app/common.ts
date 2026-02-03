export type Item = {
	name: string,
	count: number
}

export type Recipe = {
	output: Item,
	inputs: Item[],
	time: number,
	machine: string
}