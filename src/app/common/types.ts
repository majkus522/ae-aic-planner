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