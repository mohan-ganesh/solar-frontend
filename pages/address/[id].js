import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/common/Layout";
import { STRAPI_API_URL } from "../../config/config";
import styles from "../../styles/Form.module.css";
import axios from "axios";
export async function getServerSideProps(context) {
  const mapUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.API_KEY}&place_id=${context.params.id}&fields=formatted_address,name,photos,place_id,types,geometry`;
  const res = await fetch(mapUrl);
  const resJson = await res.json();

  let retAddress = {};

  if (resJson.status === "OK") {
    let addressEndPoint = "`${STRAPI_API_URL}/addresses`";

    var address = JSON.stringify({
      name: resJson.result.formatted_address,
      //resJson.result.geometry.location.lat
      //resJson.result.geometry.location.lng
      street: "street",
      zipcode: 12345,
      city: "Wexford",
    });

    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const myres = await axios.post(
      `${STRAPI_API_URL}/addresses`,
      address,
      customConfig
    );

    retAddress = myres.data;
  }

  return {
    props: {
      data: {
        resJson,
        retAddress,
      },
    },
  };
}

/**
 *
 * @param {*} param0
 * @returns
 */
export default function AddressDetails({ data }) {
  return (
    <Layout>
      <div>Address ID {data.retAddress.id}</div>

      <div>address {data.resJson.result.name}</div>
      <form className={styles.form}>
        <div className={styles.grid}>
          <label htmlFor="name">name</label>
          <input type="text" id="name" name="name" value="" />
        </div>
      </form>
    </Layout>
  );
}
