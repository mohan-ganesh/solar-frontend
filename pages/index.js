import Head from "next/head";

import styles from "../styles/Home.module.css";
import Layout from "../components/common/Layout";
import SearchAddresses from "../components/common/address/SearchAddress";

/**
 * Default Landing Page
 * @returns
 */
export default function Home() {
  return (
    <Layout>
      <div className={styles.header}>
        <h3>Get your solar possible savings!</h3>
        <p>
          In order to get a good estimate of cost savings, we'll first need you
          to enter your address below
        </p>
      </div>
      <div className={styles.search}>
        <SearchAddresses />
      </div>
    </Layout>
  );
}
