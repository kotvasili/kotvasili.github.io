export const loadFromStorage = <T>(key: string, def: T): T => {
	const item = localStorage.getItem(key) as string;
	return (JSON.parse(item) as T) ?? def;
};

export const saveToStorage = <T>(key: string, value: T) => {
	const item = JSON.stringify(value);
	localStorage.setItem(key, item);
};
