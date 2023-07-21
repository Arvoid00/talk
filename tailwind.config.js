const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        code: ["var(--font-code)"],
        input: ["var(--font-input)"]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        },
        "slide-from-left": {
          "0%": {
            transform: "translateX(-100%)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        },
        "slide-to-left": {
          "0%": {
            transform: "translateX(0)"
          },
          "100%": {
            transform: "translateX(-100%)"
          }
        }
      },
      animation: {
        "slide-from-left":
          "slide-from-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895)",
        "slide-to-left":
          "slide-to-left 0.25s cubic-bezier(0.82, 0.085, 0.395, 0.895)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};
const crimsonDarkA = {
  crimsonA1: "hsla(0, 0%, 0%, 0)",
  crimsonA2: "hsla(336, 96.8%, 53.2%, 0.045)",
  crimsonA3: "hsla(335, 98.7%, 59.3%, 0.138)",
  crimsonA4: "hsla(336, 99.1%, 59.9%, 0.191)",
  crimsonA5: "hsla(335, 99.4%, 59.4%, 0.244)",
  crimsonA6: "hsla(335, 99.4%, 59.4%, 0.315)",
  crimsonA7: "hsla(336, 99.5%, 57.8%, 0.439)",
  crimsonA8: "hsla(336, 99.9%, 55.4%, 0.642)",
  crimsonA9: "hsla(336, 99.9%, 62.8%, 0.903)",
  crimsonA10: "hsla(339, 99.9%, 66.3%, 0.934)",
  crimsonA11: "hsla(341, 99.9%, 69.5%, 0.965)",
  crimsonA12: "hsla(327, 100%, 97.1%, 0.980)"
};
const pinkDarkA = {
  pinkA1: "hsla(0, 0%, 0%, 0)",
  pinkA2: "hsla(320, 98.1%, 64.1%, 0.036)",
  pinkA3: "hsla(320, 99.1%, 63.1%, 0.121)",
  pinkA4: "hsla(320, 99.5%, 62.7%, 0.170)",
  pinkA5: "hsla(319, 99.7%, 61.5%, 0.219)",
  pinkA6: "hsla(322, 99.4%, 60.8%, 0.291)",
  pinkA7: "hsla(321, 99.6%, 58.7%, 0.407)",
  pinkA8: "hsla(322, 99.7%, 55.4%, 0.608)",
  pinkA9: "hsla(322, 100%, 64.6%, 0.817)",
  pinkA10: "hsla(323, 100%, 66.3%, 0.875)",
  pinkA11: "hsla(325, 99.9%, 68.6%, 0.960)",
  pinkA12: "hsla(314, 100%, 96.9%, 0.980)"
};
const plumDarkA = {
  plumA1: "hsla(0, 0%, 0%, 0)",
  plumA2: "hsla(300, 96.4%, 58.4%, 0.036)",
  plumA3: "hsla(300, 99.4%, 67.1%, 0.102)",
  plumA4: "hsla(295, 99.8%, 66.3%, 0.155)",
  plumA5: "hsla(295, 99.4%, 67.1%, 0.204)",
  plumA6: "hsla(294, 99.0%, 67.8%, 0.262)",
  plumA7: "hsla(294, 99.9%, 67.7%, 0.363)",
  plumA8: "hsla(292, 99.8%, 67.5%, 0.527)",
  plumA9: "hsla(292, 99.9%, 69.2%, 0.695)",
  plumA10: "hsla(295, 99.9%, 70.8%, 0.748)",
  plumA11: "hsla(300, 99.8%, 72.9%, 0.828)",
  plumA12: "hsla(300, 100%, 97.1%, 0.980)"
};
const purpleDarkA = {
  purpleA1: "hsla(0, 0%, 0%, 0)",
  purpleA2: "hsla(280, 96.5%, 57.5%, 0.045)",
  purpleA3: "hsla(279, 98.7%, 62.8%, 0.129)",
  purpleA4: "hsla(279, 99.1%, 64.0%, 0.191)",
  purpleA5: "hsla(278, 99.8%, 64.2%, 0.248)",
  purpleA6: "hsla(276, 99.6%, 64.6%, 0.328)",
  purpleA7: "hsla(274, 99.9%, 64.6%, 0.456)",
  purpleA8: "hsla(272, 99.7%, 64.6%, 0.660)",
  purpleA9: "hsla(272, 99.9%, 69.1%, 0.748)",
  purpleA10: "hsla(273, 100%, 71.3%, 0.801)",
  purpleA11: "hsla(275, 99.9%, 75.3%, 0.934)",
  purpleA12: "hsla(286, 100%, 97.1%, 0.980)"
};
const violetDarkA = {
  violetA1: "hsla(0, 0%, 0%, 0)",
  violetA2: "hsla(258, 98.2%, 61.0%, 0.054)",
  violetA3: "hsla(252, 98.8%, 65.8%, 0.148)",
  violetA4: "hsla(253, 99.7%, 65.7%, 0.219)",
  violetA5: "hsla(252, 99.7%, 66.4%, 0.286)",
  violetA6: "hsla(251, 99.7%, 66.2%, 0.371)",
  violetA7: "hsla(250, 99.7%, 66.3%, 0.514)",
  violetA8: "hsla(250, 99.7%, 66.1%, 0.733)",
  violetA9: "hsla(252, 99.9%, 70.3%, 0.786)",
  violetA10: "hsla(251, 99.9%, 72.9%, 0.844)",
  violetA11: "hsla(250, 100%, 77.9%, 0.980)",
  violetA12: "hsla(254, 100%, 97.5%, 0.980)"
};
const indigoDarkA = {
  indigoA1: "hsla(0, 0%, 0%, 0)",
  indigoA2: "hsla(234, 97.4%, 59.9%, 0.059)",
  indigoA3: "hsla(228, 99.2%, 61.7%, 0.144)",
  indigoA4: "hsla(227, 99.7%, 62.0%, 0.211)",
  indigoA5: "hsla(227, 99.2%, 62.3%, 0.270)",
  indigoA6: "hsla(226, 99.9%, 62.1%, 0.350)",
  indigoA7: "hsla(226, 99.9%, 62.0%, 0.471)",
  indigoA8: "hsla(226, 99.9%, 62.1%, 0.655)",
  indigoA9: "hsla(226, 99.9%, 63.6%, 0.848)",
  indigoA10: "hsla(227, 99.8%, 67.7%, 0.893)",
  indigoA11: "hsla(227, 100%, 76.3%, 0.980)",
  indigoA12: "hsla(226, 100%, 97.5%, 0.980)"
};
const blueDarkA = {
  blueA1: "hsla(0, 0%, 0%, 0)",
  blueA2: "hsla(221, 97.8%, 52.4%, 0.059)",
  blueA3: "hsla(215, 99.3%, 54.2%, 0.135)",
  blueA4: "hsla(215, 99.3%, 53.8%, 0.198)",
  blueA5: "hsla(213, 99.4%, 52.8%, 0.252)",
  blueA6: "hsla(212, 99.9%, 51.7%, 0.323)",
  blueA7: "hsla(211, 100%, 50.7%, 0.435)",
  blueA8: "hsla(211, 99.8%, 50.9%, 0.597)",
  blueA9: "hsla(205, 100%, 50.0%, 0.980)",
  blueA10: "hsla(208, 100%, 60.7%, 0.980)",
  blueA11: "hsla(209, 100%, 66.3%, 0.980)",
  blueA12: "hsla(196, 100%, 96.8%, 0.980)"
};
const cyanDarkA = {
  cyanA1: "hsla(0, 0%, 0%, 0)",
  cyanA2: "hsla(196, 100%, 50.0%, 0.031)",
  cyanA3: "hsla(192, 98.0%, 50.9%, 0.085)",
  cyanA4: "hsla(194, 99.6%, 51.3%, 0.133)",
  cyanA5: "hsla(192, 99.5%, 51.3%, 0.173)",
  cyanA6: "hsla(193, 99.7%, 50.4%, 0.226)",
  cyanA7: "hsla(192, 100%, 50.0%, 0.310)",
  cyanA8: "hsla(193, 100%, 50.0%, 0.425)",
  cyanA9: "hsla(190, 99.8%, 50.8%, 0.731)",
  cyanA10: "hsla(188, 100%, 50.0%, 0.775)",
  cyanA11: "hsla(186, 100%, 49.9%, 0.824)",
  cyanA12: "hsla(185, 99.8%, 95.1%, 0.978)"
};
const tealDarkA = {
  tealA1: "hsla(0, 0%, 0%, 0)",
  tealA2: "hsla(171, 100%, 49.2%, 0.031)",
  tealA3: "hsla(172, 100%, 49.7%, 0.070)",
  tealA4: "hsla(175, 100%, 49.7%, 0.105)",
  tealA5: "hsla(174, 98.9%, 50.1%, 0.140)",
  tealA6: "hsla(174, 100%, 51.8%, 0.187)",
  tealA7: "hsla(173, 99.6%, 53.2%, 0.257)",
  tealA8: "hsla(174, 99.6%, 53.3%, 0.366)",
  tealA9: "hsla(173, 99.9%, 54.6%, 0.609)",
  tealA10: "hsla(174, 99.9%, 53.8%, 0.670)",
  tealA11: "hsla(174, 100%, 52.0%, 0.748)",
  tealA12: "hsla(166, 98.6%, 95.0%, 0.979)"
};
const greenDarkA = {
  greenA1: "hsla(0, 0%, 0%, 0)",
  greenA2: "hsla(169, 100%, 48.5%, 0.027)",
  greenA3: "hsla(162, 98.7%, 57.9%, 0.070)",
  greenA4: "hsla(158, 98.6%, 59.7%, 0.105)",
  greenA5: "hsla(158, 98.6%, 60.7%, 0.140)",
  greenA6: "hsla(156, 99.9%, 62.0%, 0.187)",
  greenA7: "hsla(154, 99.5%, 63.1%, 0.257)",
  greenA8: "hsla(152, 99.7%, 64.2%, 0.370)",
  greenA9: "hsla(151, 99.7%, 63.8%, 0.605)",
  greenA10: "hsla(152, 99.9%, 66.5%, 0.661)",
  greenA11: "hsla(151, 99.7%, 69.2%, 0.740)",
  greenA12: "hsla(137, 100%, 95.8%, 0.980)"
};
const grassDarkA = {
  grassA1: "hsla(0, 0%, 0%, 0)",
  grassA2: "hsla(107, 97.2%, 61.9%, 0.022)",
  grassA3: "hsla(128, 96.5%, 69.8%, 0.066)",
  grassA4: "hsla(130, 100%, 70.2%, 0.100)",
  grassA5: "hsla(130, 98.2%, 69.1%, 0.140)",
  grassA6: "hsla(132, 99.9%, 69.3%, 0.187)",
  grassA7: "hsla(132, 99.9%, 69.8%, 0.261)",
  grassA8: "hsla(130, 99.6%, 70.5%, 0.370)",
  grassA9: "hsla(130, 99.7%, 70.6%, 0.618)",
  grassA10: "hsla(131, 100%, 73.5%, 0.674)",
  grassA11: "hsla(130, 99.7%, 75.6%, 0.731)",
  grassA12: "hsla(137, 100%, 95.8%, 0.980)"
};
const orangeDarkA = {
  orangeA1: "hsla(0, 0%, 0%, 0)",
  orangeA2: "hsla(13, 100%, 49.7%, 0.054)",
  orangeA3: "hsla(20, 100%, 49.7%, 0.117)",
  orangeA4: "hsla(23, 100%, 49.8%, 0.166)",
  orangeA5: "hsla(23, 99.4%, 50.1%, 0.215)",
  orangeA6: "hsla(23, 99.8%, 51.1%, 0.286)",
  orangeA7: "hsla(23, 99.7%, 50.6%, 0.389)",
  orangeA8: "hsla(24, 100%, 49.9%, 0.523)",
  orangeA9: "hsla(24, 99.9%, 51.6%, 0.965)",
  orangeA10: "hsla(25, 100%, 58.6%, 0.980)",
  orangeA11: "hsla(24, 100%, 62.4%, 0.980)",
  orangeA12: "hsla(26, 100%, 94.2%, 0.980)"
};
const brownDarkA = {
  brownA1: "hsla(0, 0%, 0%, 0)",
  brownA2: "hsla(22, 99.6%, 53.6%, 0.035)",
  brownA3: "hsla(18, 97.8%, 69.0%, 0.088)",
  brownA4: "hsla(21, 98.2%, 71.0%, 0.123)",
  brownA5: "hsla(25, 98.4%, 72.1%, 0.158)",
  brownA6: "hsla(25, 98.7%, 73.5%, 0.206)",
  brownA7: "hsla(25, 99.0%, 74.6%, 0.289)",
  brownA8: "hsla(28, 99.2%, 75.3%, 0.407)",
  brownA9: "hsla(28, 100%, 74.8%, 0.642)",
  brownA10: "hsla(28, 99.9%, 74.9%, 0.712)",
  brownA11: "hsla(28, 99.9%, 74.9%, 0.843)",
  brownA12: "hsla(32, 98.2%, 95.7%, 0.979)"
};
