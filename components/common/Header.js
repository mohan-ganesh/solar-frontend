import Link from "next/link";
import styles from "../../styles/Layout.module.css";

/**
 *
 * @returns
 */
export default function Header() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <a>Solar Quotes</a>
          </Link>
        </div>
      </header>
    </div>
  );
}
