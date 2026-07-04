import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  mobileSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",

  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },

    openSidebar: (state) => {
      state.isCollapsed = false;
    },

    closeSidebar: (state) => {
      state.isCollapsed = true;
    },

    openMobileSidebar: (state) => {
      state.mobileSidebarOpen = true;
    },

    closeMobileSidebar: (state) => {
      state.mobileSidebarOpen = false;
    },

    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
  },
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  openMobileSidebar,
  closeMobileSidebar,
  toggleMobileSidebar,
} = sidebarSlice.actions;

export default sidebarSlice.reducer