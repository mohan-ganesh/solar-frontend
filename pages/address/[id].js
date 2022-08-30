import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/common/Layout";
import { STRAPI_API_URL } from "../../config/config";
import styles from "../../styles/Form.module.css";
import axios from "axios-observable";
export function getServerSideProps(context) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.API_KEY}&place_id=${context.params.id}&fields=formatted_address,icon,name,photos,place_id,types,photos,geometry`;

  let resJson = {};
  let addressId = -1;
  axios.get(url).subscribe(
    (response) => {
      resJson = response.data;

      var address = JSON.stringify({
        name: "Mohan Ganesh",
        street: "my street",
        zipcode: 12345,
        city: "Wexford",
      });

      axios
        .post(`${STRAPI_API_URL}/addresses`, {
          address,
        })
        .subscribe(
          (response) => {
            addressId = response.data.id;
          },
          (error) => console.log(error)
        );
    },
    (error) => console.log(error)
  );

  //end of api call

  return {
    props: {
      data: {
        resJson,
        addressId,
      },
    },
  };
}

export default function AddressDetails({ data }) {
  return (
    <Layout>
      <Head>
        <title>{data.addressId}</title>
      </Head>
      <div>address id is {data.addressId}</div>
      <form className={styles.form}>
        <div className={styles.grid}>
          <label htmlFor="name">name</label>
          <input type="text" id="name" name="name" value="" />
        </div>
      </form>
    </Layout>
  );
}
