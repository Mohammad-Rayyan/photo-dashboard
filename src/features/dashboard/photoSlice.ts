import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PAGINATION } from "../../constants/photoDashboard";
import { IPhoto } from "../../types/photoAPI";

export interface PhotoDashboardState {
  photoList: IPhoto[];
  albumList: number[];
  filters: {
    title: string;
    album: string;
  };
  pagination: {
    page: number;
    pageSize: number;
    count: number;
  };
}

const initialState: PhotoDashboardState = {
  photoList: [],
  albumList: [],
  filters: {
    title: "",
    album: "",
  },
  pagination: {
    page: 0,
    pageSize: PAGINATION.DEFAULT,
    count: 0,
  },
};

export const photoDashboardSlice = createSlice({
  name: "photoDashboard",
  initialState,
  reducers: {
    changePageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
    },
    updatePhotoList: (
      state,
      action: PayloadAction<{ photos: IPhoto[]; count: number }>
    ) => {
      state.photoList = action.payload.photos;
      state.pagination.count = action.payload.count;
    },
    updateAlbumsList: (state, action: PayloadAction<number[]>) => {
      state.albumList = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    changeFilters: (
      state,
      action: PayloadAction<PhotoDashboardState["filters"]>
    ) => {
      const payload = action.payload;
      state.filters = payload;
      state.pagination.page = 0;
    },
  },
});

export const selectPhotoList = (state: RootState) =>
  state.photoDashboard.photoList;

export const selectPagination = (state: RootState) =>
  state.photoDashboard.pagination;

export const selectFilters = (state: RootState) => state.photoDashboard.filters;
export const selectAlbumList = (state: RootState) =>
  state.photoDashboard.albumList;

export const {
  changePageSize,
  changePage,
  changeFilters,
  updatePhotoList,
  updateAlbumsList,
} = photoDashboardSlice.actions;
export default photoDashboardSlice.reducer;
