export const createID = (): string =>
	(
		Date.now().toString(36) + ((Math.random() * 1e5) ^ 1).toString(36)
	).toUpperCase();
