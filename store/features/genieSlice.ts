import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  role: "user" | "genie";
  text: string;
}

interface GenieState {
  messages: Message[];
}

const initialState: GenieState = {
  messages: [],
};

const genieSlice = createSlice({
  name: "genie",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = genieSlice.actions;
export default genieSlice.reducer;
