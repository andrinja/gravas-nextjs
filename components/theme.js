const theme = {
  colors: {
    primary: "#1E514B",
    primaryLight: "#4B7E77",
    primaryDark: "#002823",
    primaryCool: "#37A7A2",

    secondary: "#F9E18B",
    secondaryLight: "#FFFFBC",
    secondaryDark: "#C4AF5C",

    surface: "#BDBDBD",
    background: "#FAFAF8",
    error: "#B00020",

    darkGrey: "#333333",
    lightGrey: "#D8DACE",
    superLightGrey: "#F2F2F2",

    white: "#FFFFFF"
  },

  fontColors: {
    primary: "#333333",
    secondary: "#4F4F4F",
    disabled: "#6B6B6B",
    divider: "#BDBDBD"
  },
  fonts: {
    headline3: "2.5rem",
    headline4: "2rem",
    headline5: "1.5rem",
    title: "1.25rem",
    body: "1rem",
    button: ".8rem",
    caption: ".75rem"
  },
  fontWeight: {
    light: "300",
    medium: "500",
    bold: "700"
  },

  // Ready-to-interpolate media-query strings:  @media ${media.sm} { ... }
  //
  // `sm` (720) and `xs` (512) are both real and both wanted. They used to be
  // two module-level `breakpoints` consts that shared a name but not a value —
  // navbar/style.js had sm: 720px, contact/style.js had sm: 512px — which read
  // as a bug but is actually two components with different reflow points. They
  // are named apart here so the difference is deliberate rather than accidental.
  media: {
    md: "(max-width: 1240px)",
    sm: "(max-width: 720px)",
    xs: "(max-width: 512px)"
  }
};

export const { colors, fontColors, fonts, fontWeight, media } = theme;

export default theme;
