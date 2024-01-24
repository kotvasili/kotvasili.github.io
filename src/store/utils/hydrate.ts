import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { RootState } from '../index';

export const hydrate = createAction<RootState>(HYDRATE);
