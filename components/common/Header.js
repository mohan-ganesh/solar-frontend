import Link from "next/link";
import styles from "../../styles/Layout.module.css";

/**
 *Common header component
 * @returns
 */
export default function Header() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>Solar Quotes</div>
      </header>
    </div>
  );
}
