import { createTheme } from '@mui/material';
import { grey, pink } from '@mui/material/colors';

export const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: pink[900],
    },
  },
  typography: {
    title: {
      color: grey[50],
      fontSize: '2rem',
      fontWeight: 'bolder',
    },
  },
});

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}
