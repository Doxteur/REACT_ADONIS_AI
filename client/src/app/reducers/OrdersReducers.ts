import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/app/middlewares/ReduxMiddlewares';
import { Order } from '@/components/services/types/orders';
import { REACT_APP_API_URL } from '../../config';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await axiosInstance.get(`${REACT_APP_API_URL}/orders`);
    return response.data;
  }
);

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (orderData: Order, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${REACT_APP_API_URL}/orders`, orderData);
      return response.data as Order;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Une erreur inconnue est survenue lors de l\'ajout de la commande');
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (orderData: Order, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${REACT_APP_API_URL}/orders/${orderData.id}`, orderData);
      return response.data as Order;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Une erreur inconnue est survenue lors de la mise à jour de la commande');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [] as Order[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.orders.push(action.payload);
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default ordersSlice.reducer;

