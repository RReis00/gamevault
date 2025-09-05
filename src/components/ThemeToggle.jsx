import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function ThemeToggle({ iconOnly = false, showLabel = false }) {
  const { theme, toggleTheme } = useTheme();

  // Determine which icon/label to display based on current theme
  const isDark = theme === "dark";
  const Icon = isDark ? Moon : Sun; // Dark theme → moon icon, Light theme → sun icon
  const label = isDark ? "Dark" : "Light";

  return (
    <button
      type="button"
      className="btn btn-toggle-theme d-flex align-items-center"
      onClick={toggleTheme}
      aria-label={iconOnly ? `Toggle theme (${label})` : "Toggle theme"} // Better accessibility
      title="Toggle theme"
      style={{
        color: "var(--text)",
        backgroundColor: "transparent",
        borderColor: "var(--text)",
      }}
    >
      {/* Theme icon */}
      <Icon
        size={20}
        strokeWidth={2.5}
        color="var(--text)"
        aria-hidden="true"
      />

      {/* Optional label (desktop only) */}
      {showLabel && !iconOnly && (
        <span className="toggle-text ms-2">{label}</span>
      )}
    </button>
  );
}

export default ThemeToggle;
