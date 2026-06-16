export const getErrorMessage = (error: any, fallback: string = "An error occurred"): string => {
	if (!error) return fallback;

	console.log("API Error payload:", error);

	// Try extracting from errors array
	const errors = error?.data?.errors || error?.data?.data?.errors || error?.errors;
	if (Array.isArray(errors) && errors.length > 0) {
		const firstErr = errors[0];
		if (firstErr && typeof firstErr === 'object') {
			if (firstErr.message) return firstErr.message;
			if (firstErr.error) return firstErr.error;
		}
		if (typeof firstErr === 'string') return firstErr;
	}

	// Try extracting from message/error properties
	const message = error?.data?.message || error?.data?.data?.message || error?.message || error?.error;
	if (typeof message === 'string' && message) return message;

	// Fallback to stringified data if it is an object
	if (error?.data) {
		if (typeof error.data === 'string') return error.data;
		try {
			return JSON.stringify(error.data);
		} catch (e) {}
	}

	return fallback;
};
