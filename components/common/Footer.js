import Link from "next/link";
import styles from "../../styles/Layout.module.css";

/**
 *Footer Component
 * @returns
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Solar Quotes</p>
    </footer>
  );
}
