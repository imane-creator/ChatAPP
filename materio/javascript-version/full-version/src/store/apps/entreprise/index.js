import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Fetch Data Thunk
export const fetchData = createAsyncThunk('entreprises/fetchData', async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/allentreprises`)
    if (response.status === 404) {
      return {
        allData: [],
        entreprises: [],
        total: 0,
        params
      }
    }

    return {
      entreprises: response.data,
      total: response.data.length,
      params,
      allData: response.data
    }
  } catch (err) {
    return rejectWithValue(err.response)
  }
})

// Delete Entreprise Thunk
export const deleteEntreprise = createAsyncThunk('entreprises/deleteEntreprise', async (id, { dispatch }) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/entreprise/${id}`)

    dispatch(fetchData({ q: '' }))

    return id
  } catch (err) {
    return rejectWithValue(err.response)
  }
})

const entrepriseSlice = createSlice({
  name: 'entreprises',
  initialState: {
    allData: [],
    entreprises: [],
    total: 0,
    params: {},
    loading: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.allData = action.payload.allData
        state.entreprises = action.payload.entreprises
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(deleteEntreprise.fulfilled, (state, action) => {
        state.entreprises = state.entreprises.filter(entreprise => entreprise.id !== action.payload)
        state.total -= 1
      })
  }
})

export default entrepriseSlice.reducer
