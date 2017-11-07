export const firebaseObjectMap = (action): any => {
	if (!action) {
		return null;
	}

	return {
		$key: action.key,
		...action.payload.val()
	};
}

export const firebaseListMap = (actions: Array<any>): any => {
	if (!actions) {
		return [];
	}

	return [ ...actions ]
		.map(action => firebaseObjectMap(action));
}
