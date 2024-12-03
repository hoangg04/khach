import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    "usr_name": undefined,
    "usr_email": undefined,
    "usr_phone": undefined,
    "usr_address": undefined,
    "usr_avatar": undefined,
    "usr_role": undefined,
    "usr_id": undefined,
    "cart_count": undefined,
  },
  reducers: {
    login: (state, { payload }) => {
      state.usr_id = payload.usr_id ?? state.usr_id;
      state.usr_name = payload.usr_name ?? state.usr_name;
      state.usr_email = payload.usr_email ?? state.usr_email;
      state.usr_phone = payload.usr_phone ?? state.usr_phone;
      state.usr_address = payload.usr_address ?? state.usr_address;
      state.usr_avatar = payload.usr_avatar ?? state.usr_avatar;
      state.usr_role = payload.usr_role ?? state.usr_role;
    },
    logout: (state) => {
      state.usr_id = undefined;
      state.usr_name = undefined;
      state.usr_email = undefined;
      state.usr_phone = undefined;
      state.usr_address = undefined;
      state.usr_avatar = undefined;
      state.usr_role = undefined;
    },
    updateCart: (state, { payload }) => {
      state.cart_count = payload.cart_count;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout ,updateCart} = userSlice.actions

export default userSlice.reducer