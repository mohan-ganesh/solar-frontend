import styles from "../styles/Home.module.css";
import Layout from "../components/common/Layout";
import SearchAddresses from "../components/common/address/SearchAddress";

/**
 * Default Landing Page
 * @returns
 */
export default function Home() {
  return (
    <Layout
      title="Welcome to solar quotes"
      description="What is solar energy"
      keywords="solar"
    >
      <div className={styles.header}>
        <h3>Get your solar possible savings!</h3>
        <div className={styles.cardheader}>
          <p>
            In order to get a good estimate of cost savings, we'll first need
            you to enter your address below
          </p>
        </div>
      </div>
      <div className={styles.search}>
        <SearchAddresses />
      </div>
    </Layout>
  );
}

/**
 * Process Any Server side events
 */
export async function getServerSideProps() {
  return {
    props: {},
  };
}
