import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="btn btn-toggle-theme ms-2"
      onClick={toggleTheme}
      aria-label="Change Theme"
      title="Toggle theme"
    >
      <span className="toggle-icon">{theme === "light" ? "🌙" : "☀️"}</span>
      <span className="toggle-text">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
}

export default ThemeToggle;
