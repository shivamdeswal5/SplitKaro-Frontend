import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category } from '@/lib/types/CategoryType';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axios.get('/api/categories');
    return response.data;
  }
);
