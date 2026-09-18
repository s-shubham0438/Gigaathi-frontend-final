import { createSlice } from '@reduxjs/toolkit';
import mockDb from '../../../mocks/mockDb';

const initialState = {
  items: mockDb.getWishlist(),
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistService: (state, action) => {
      const serviceId = action.payload;
      mockDb.toggleWishlist(serviceId);
      state.items = mockDb.getWishlist();
    },
  },
});

export const { toggleWishlistService } = wishlistSlice.actions;
export default wishlistSlice.reducer;
