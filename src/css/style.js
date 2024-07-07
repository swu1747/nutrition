import { createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";

const theme = createTheme({

    palette: {
        primary: {
            main: '#1995AD',
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    color: '#808080'
                }
            }
        },

        MuiStack: {
            defaultProps: {
                spacing: 3
            },
            styleOverrides: {
                root: {
                    width: '100%',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    height: 125,
                    width: 125
                }
            }
        },
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#1995AD',
                    }
                }
            }
        }

    }
})

export default theme