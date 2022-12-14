import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Layout.module.css";
import Header from "./Header";
import Footer from "../common/Footer";

/**
 * Common Layout component with title, description and keywords
 * @param {*}
 */
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          httpEquiv="content-type"
          content="text/html; charset=utf-8"
        ></meta>
        <meta name="author" content="Ganesh, Mohan" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="canonical" href="https://solar.mohanganesh.com/" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}
