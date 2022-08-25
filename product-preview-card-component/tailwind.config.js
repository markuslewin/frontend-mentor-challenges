function pxToRem(px) {
  return `${px / 16}rem`;
}

const colors = {
  "pure-white": "hsl(0, 0%, 100%)",
  cream: "hsl(30, 38%, 92%)",
  "aurometal-saurus": "hsl(228, 12%, 48%)",
  "deep-aquamarine": "hsl(158, 36%, 37%)",
  "deep-aquamarine-hover": "hsl(157, 43%, 18%)",
  gunmetal: "hsl(212, 21%, 14%)",
};

const fontFamily = {
  fraunces: "Fraunces, serif",
  montserrat: "Montserrat, sans-serif",
};

const fontSize = {
  large: pxToRem(32),
  medium: pxToRem(14),
  small: pxToRem(13),
  "extra-small": pxToRem(12),
};

const fontWeight = {
  normal: 500,
  bold: 700,
};

const lineHeight = {
  large: pxToRem(32),
  medium: pxToRem(23),
  small: pxToRem(17),
  "extra-small": pxToRem(15),
};

module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    colors,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    extend: {},
  },
  variants: {},
  plugins: [],
};
