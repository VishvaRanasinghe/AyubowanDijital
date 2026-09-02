import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep circuit-navy background, matching the flyer
        ink: "#070E1A",
        panel: "#0C1830",
        line: "#1C2B47",
        // Electric blue accent (the "Ji" in the logo, the glowing hands)
        signal: "#4FC3F7",
        signalBright: "#8FE3FF",
        mist: "#9FB2CC",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        circuit:
          "radial-gradient(circle at 80% 10%, rgba(79,195,247,0.18), transparent 45%), radial-gradient(circle at 10% 90%, rgba(79,195,247,0.10), transparent 40%)",
      },
    },
  },
  plugins: [],
};
export default config;
