// Design tokens for the "Lauku miers" look (redesign, P15): a warm cream
// ground, deep green ink, the brand green for actions and a muted gold for
// accents. Cormorant Garamond for display type over Raleway for everything
// else; both are loaded with next/font in pages/_app.js and exposed as the
// CSS variables referenced by `families` below.
//
// The key names (colors.primary, fontColors.disabled, fonts.headline5 …) are
// kept from the previous theme so every existing style.js keeps working;
// only the values changed. New groups: families, radii, layout.
const theme = {
  colors: {
    primary: "#1E514B",
    primaryLight: "#4B7E77",
    primaryDark: "#0E302C",
    primaryCool: "#37A7A2",

    // Gold. `secondary` is the bright one for use on dark grounds, `secondaryDark`
    // the muted one that passes AA contrast for small text on cream (4.8:1).
    secondary: "#E3C565",
    secondaryLight: "#F0D98A",
    secondaryDark: "#85661F",

    surface: "#EFE9DB",
    background: "#F6F2E8",
    ink: "#1B2E2B",
    error: "#B00020",

    darkGrey: "#3E4B48",
    lightGrey: "#D9D2C1",
    superLightGrey: "#FBF9F4",

    white: "#FFFFFF"
  },

  fontColors: {
    primary: "#1B2E2B",
    secondary: "#3E4B48",
    disabled: "#5A6663",
    divider: "#D9D2C1",
    onDark: "#F6F2E8"
  },

  families: {
    display: "var(--font-display), Georgia, serif",
    body: "var(--font-body), sans-serif"
  },

  fonts: {
    headline2: "clamp(2.75rem, 5vw, 4.75rem)",
    headline3: "clamp(2.25rem, 3.5vw, 2.75rem)",
    headline4: "2rem",
    headline5: "1.5rem",
    title: "1.25rem",
    body: "1.0625rem",
    button: ".9375rem",
    caption: ".875rem",
    eyebrow: ".8125rem"
  },
  // Only 400 and 600 are loaded (see pages/_app.js); the other names map
  // onto them so no style asks for a weight the browser would synthesise.
  fontWeight: {
    light: "400",
    regular: "400",
    medium: "600",
    semibold: "600",
    bold: "600"
  },

  radii: {
    sm: "2px",
    md: "3px",
    pill: "999px"
  },

  layout: {
    maxWidth: "90rem",
    gutter: "3.5rem",
    gutterSm: "1rem",
    navHeight: "4.5rem"
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

export const { colors, fontColors, families, fonts, fontWeight, radii, layout, media } = theme;

export default theme;
