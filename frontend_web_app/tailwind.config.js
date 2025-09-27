export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#F59E0B",
        success: "#F59E0B",
        error: "#EF4444",
        background: "#f9fafb",
        surface: "#ffffff",
        text: "#111827"
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl: "0.9rem"
      },
      backgroundImage: {
        'ocean-gradient': "linear-gradient(135deg, rgba(59,130,246,0.1), #f9fafb)"
      }
    }
  },
  plugins: []
}
