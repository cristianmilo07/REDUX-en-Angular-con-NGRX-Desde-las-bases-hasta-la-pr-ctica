//ngrx

import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export const initialState = false;

export const counterReducer = createReducer(
  initialState,
  on(isLoading, () => true),
  on(stopLoading, () => false),
);