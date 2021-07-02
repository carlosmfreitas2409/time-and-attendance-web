import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#1B1B1F",
      "800": "#202024",
      "700": "#2B2B2E",
      "600": "#41414D",
      "500": "#47474D",
      "400": "#797980",
      "300": "#7A7A80",
      "100": "#EBEBF0",
      "50": "#F4F5F6",
    },
    red: {
      "500": "#DC1637"
    }
  },
  fonts: {
    heading: 'Archivo',
    body: 'Inter'
  },
  styles: {
    global: {
      bg: 'gray.50',
      color: 'gray.300'
    }
  }
});