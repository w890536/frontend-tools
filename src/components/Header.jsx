import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/gradient">Gradient</Link>
        <Link to="/color-picker">Color Picker</Link>
        <Link to="/json-formatter">JSON Formatter</Link>
      </nav>
    </header>
  );
}