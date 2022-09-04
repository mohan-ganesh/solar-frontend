import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/common/Layout";
import { STRAPI_API_URL } from "../../config/config";
import styles from "../../styles/Confirmation.module.css";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import cookie from "cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useCookies } from "react-cookie";
/**
 *
 * @param {*} param0
 * @returns
 */
export default function ConfirmationDetails({ quote, address, savings }) {
  const router = useRouter();
  //state for addressId cookie
  const [cookie, setCookie] = useCookies(["addressId"]);
  /**
   * reset the address id from cookie and send to landing page
   */
  function handleClick() {
    setCookie("addressId", "", { path: "/" });
    router.push("/");
  }

  return (
    <Layout>
      <div className="center">
        <div className={styles.cardConfirm}>
          Great! based on the information provided, estimated average
          <b>&nbsp;monthly&nbsp;</b>
          energy bill will be <b>&nbsp;$$$&nbsp;</b> and estimated area of your
          solar panel array.
        </div>
        <div className={styles.cardConfirm}>
          The address is <b>&nbsp;{address.address}&nbsp;</b>. You can refer the
          quote id <b>&nbsp;{quote.id}&nbsp;</b> to get more details. We would
          like to run this infomation against our machine learning model to get
          more accuare details.
        </div>
        &nbsp; &nbsp;
        <div>
          <button type="submit" onClick={handleClick} className="btn">
            Would you like to get estimates for another location !
          </button>
        </div>
      </div>
    </Layout>
  );
}

//Get the cookie value
function parseCookie(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}

export async function getServerSideProps({ query: { id }, req }) {
  const quoteEndPoint = `${STRAPI_API_URL}/quotes/${id}`;
  const resQuoteFetch = await fetch(quoteEndPoint);
  let quote = await resQuoteFetch.json();

  //get the addressId from cookie

  let { addressId } = parseCookie(req);

  const addressAPI = `${STRAPI_API_URL}/addresses/${addressId}`;

  let resAddressFetch = await fetch(addressAPI);
  let address = await resAddressFetch.json();

  //calculate the savings
  let savings = {
    estimate: "500",
  };

  return {
    props: {
      quote: quote,
      address: address,
      savings: savings,
    },
  };
}
