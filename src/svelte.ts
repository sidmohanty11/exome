import { type Exome, subscribe } from "exome";

export function useStore<T extends Exome, R = T>(
	store: T,
	selector: (state: T) => R = (v) => v as any,
) {
	return {
		subscribe(cb: (value: R) => void) {
			cb(selector(store));
			return subscribe(store, () => cb(selector(store)));
		},
	};
}
