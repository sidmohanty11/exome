import type { Exome } from "./constructor.ts";
import { addMiddleware } from "./middleware.ts";

type Unsubscribe = () => void;

export const onAction = <T extends Exome>(
	Parent: new (...args: any[]) => T,
	action: null | "NEW" | "LOAD_STATE" | keyof T,
	callback: (
		instance: T,
		action: "NEW" | "LOAD_STATE" | keyof T,
		payload: any[],
	) => void,
	type: "before" | "after" = "after",
): Unsubscribe => {
	return addMiddleware((instance, targetAction, payload) => {
		if (
			!(
				instance instanceof Parent &&
				(targetAction === action || action === null)
			)
		) {
			return;
		}

		if (type === "before") {
			callback(instance, targetAction as any, payload);
			return;
		}

		return () => callback(instance, targetAction as any, payload);
	});
};
