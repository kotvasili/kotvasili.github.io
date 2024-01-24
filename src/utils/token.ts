export const removeToken = async () => {
	return fetch('/api/logout')
		.then(() => {
			// Intended No-op
		})
		.catch(() => {
			// Intended No-op
		});
};
