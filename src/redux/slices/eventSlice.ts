import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FormState {
  id: string;
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

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<FormState, 'id'>>) => {
      state.push({...action.payload, id: generateId()});
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      return state.filter(event => event.id !== action.payload);
    },
    resetEvents: () => initialState,
  },
});

export const {addEvent, deleteEvent, resetEvents} = eventSlice.actions;
export default eventSlice.reducer;
