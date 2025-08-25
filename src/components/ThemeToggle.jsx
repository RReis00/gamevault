import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function ThemeToggle({ iconOnly = false, showLabel = false }) {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const Icon = isDark ? Moon : Sun;
  const label = isDark ? "Dark" : "Light";

  return (
    <button
      type="button"
      className="btn btn-toggle-theme d-flex align-items-center"
      onClick={toggleTheme}
      aria-label={iconOnly ? `Toggle theme (${label})` : "Toggle theme"}
      title="Toggle theme"
      style={{
        color: "var(--text)",
        backgroundColor: "transparent",
        borderColor: "var(--text)",
      }}
    >
      <Icon
        size={20}
        strokeWidth={2.5}
        color="var(--text)"
        aria-hidden="true"
      />
      {showLabel && !iconOnly && (
        <span className="toggle-text ms-2">{label}</span>
      )}
    </button>
  );
}

export default ThemeToggle;
