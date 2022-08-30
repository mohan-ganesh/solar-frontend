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
      <h1>Get your solar possible savings!</h1>
      <SearchAddresses />
    </Layout>
  );
}
