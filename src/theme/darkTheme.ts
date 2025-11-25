import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: { default: '#111', paper: '#222' },
        primary: { main: '#ff5722' }, // red for GPS button
        secondary: { main: '#000000' }, // black for main actions
        text: { primary: '#fff', secondary: '#ccc' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
    },
});
