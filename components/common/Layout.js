import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Layout.module.css";
import Header from "./Header";
import Footer from "../common/Footer";
/**
 * Common Layout component
 * @param {*} param0
 */
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <div className="{styles.container}">{children} </div>
      <Footer />
    </div>
  );
}
