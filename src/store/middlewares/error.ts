import { isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

export const apiErrorLogger: Middleware = () => (next) => (action) => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejectedWithValue(action)) {
		// eslint-disable-next-line no-console
		console.warn(
			'We got a rejected call!' +
				`Status: ${action?.payload?.status} Endpoint: ${JSON.stringify(action?.meta.arg.endpointName)}` // eslint-disable-line
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return next(action);
};
