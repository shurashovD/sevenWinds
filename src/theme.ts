import { createTheme, outlinedInputClasses } from '@mui/material'

export const theme = createTheme(
  {
    palette: {
      background: {
        default: '#27272A',
        paper: '#202124',
      },
      text: {
        primary: '#FFFFFF',
        disabled: '#A1A1A1',
      },
      divider: '#414144',
    },
    components: {
      MuiTab: {
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: 'none',
            color: theme.palette.text.disabled,
            '&.Mui-selected': {
              color: theme.palette.text.primary,
            },
          }),
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.text.primary,
            },
          }),
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& label': {
              color: theme.palette.divider,
            },
            '& label.Mui-focused': {
              color: theme.palette.text.primary,
            },
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: ({ theme }) => ({
            borderColor: theme.palette.divider,
          }),
          root: ({ theme }) => ({
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.text.primary,
            },
            '& .MuiInputBase-input': {
              padding: '10px',
            },
          }),
        },
      },
    },
  },
  {},
)
