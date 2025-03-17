import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FormState {
  name: string;
  date: Date;
  time: Date;
  country: string;
  state: string;
  city: string;
  images: string[];
  attendees: string;
  description: string;
}

const initialState: FormState[] = [];

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<FormState>) => {
      state.push(action.payload);
    },
    resetEvents: () => initialState,
  },
});

export const {addEvent, resetEvents} = eventSlice.actions;
export default eventSlice.reducer;
