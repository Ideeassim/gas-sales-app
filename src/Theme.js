import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Tirra, sans-serif", // 👈 Apply custom font
    fontSize:15
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none", // removes default outline
          },
          "&:focus-visible": {
            outline: "none", // removes outline when clicked or keyboard focused
          },
          backgroundColor: "#fff",
          color: "#57564F",
          "&:hover": {
            backgroundColor: "#f3e6d29b",
            color:'#57564F',
            borderRadius: '20px'
          },
        },
        outlined: {
          // borderColor: "#f5da0dff", // ✅ fixed (was "#57564")
          border:'0px',
          color: "#57564F",
          "&:hover": {
            borderColor: "#57534fff",
            backgroundColor: "#DFD0B8",
            color:'#fff'
          },
        },
      },
    },
    MuiFab:{
      styleOverrides:{
        root: {
          "&:focus": {
            outline: "none", // removes default outline
          },
          "&:focus-visible": {
            outline: "none", // removes outline when clicked or keyboard focused
          },
        }
      }
    },
     MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FAA533",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#FAA533",
          },
        },
      },
    },
  },
});

export default theme;
