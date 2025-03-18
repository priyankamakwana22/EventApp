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
  userId: string; // Associate event with a user
}

interface EventsState {
  [userId: string]: FormState[]; // Store events under each userId
}

const initialState: EventsState = {};

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<FormState, 'id'>>) => {
      const {userId} = action.payload;
      if (!state[userId]) {
        state[userId] = [];
      }
      state[userId].push({...action.payload, id: generateId()});
    },
    deleteEvent: (
      state,
      action: PayloadAction<{userId: string; eventId: string}>,
    ) => {
      if (state[action.payload.userId]) {
        state[action.payload.userId] = state[action.payload.userId].filter(
          event => event.id !== action.payload.eventId,
        );
      }
    },
    resetEvents: (state, action: PayloadAction<string>) => {
      state[action.payload] = [];
    },
  },
});

export const {addEvent, deleteEvent, resetEvents} = eventSlice.actions;
export default eventSlice.reducer;
