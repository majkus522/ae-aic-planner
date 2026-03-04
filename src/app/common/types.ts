export type ItemStack = {
	item: string;
	amount: number;
};

export type Recipe = {
	output: ItemStack;
	inputs: ItemStack[];
	time: number;
	machine: string;
};

export type ItemData = {
	name: string;
	description: string;
};

export type MachineData = {
	name: string;
	description: string;
	power: number;
}