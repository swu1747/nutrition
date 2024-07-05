import { createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";

const theme = createTheme({
    palette: {

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
                    borderRadius:'3%'
                }
            }
        },
        MuiAvatar:{
            styleOverrides:{
                root:{
                    height:125,
                    width:125
                }
            }
        }

    }
})

export default theme