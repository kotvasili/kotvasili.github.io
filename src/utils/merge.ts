type TComparable = { Id: string };

export const merge = (
	a: TComparable[],
	b: TComparable[],
	predicate = (a: string, b: string): boolean => a === b
) => {
	const c = [...a];
	b.forEach((bItem) =>
		c.some((cItem) => predicate(bItem.Id, cItem.Id)) ? null : c.push(bItem)
	);
	return c;
};
