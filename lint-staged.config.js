module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', () => 'yarn lint'],
	'**/*.{ts,tsx}': () => 'yarn type-check',
	'*.{json,yaml}': ['prettier --write'],
};
