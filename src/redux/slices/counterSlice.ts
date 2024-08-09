// ducks pattern

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
	value: number;
}

const initialState: CounterState = {
	value: 0,
};

const couterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment(state) {
			state.value++; // you can mutate the state directly because of immer library makes it immutable under the hood
		},
		incrementBy(state, action: PayloadAction<number>) {
			state.value += action.payload;
		},
		decrement(state) {
			state.value = state.value <= 0 ? 0 : state.value - 1;
		},
		reset(state) {
			state.value = 0;
		},
	},
});

// reducer update the state based on the action payload
export const { increment, incrementBy, decrement, reset } = couterSlice.actions;

export default couterSlice.reducer;
