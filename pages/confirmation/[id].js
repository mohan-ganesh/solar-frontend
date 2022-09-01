import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/common/Layout";
import { STRAPI_API_URL } from "../../config/config";
import styles from "../../styles/Form.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import cookie from "cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
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
      <div>quotes : {quote.id}</div>
      <div>address : {address.id}</div>
      <div>savings : {savings.estimate}</div>
      <div>
        <button type="submit" onClick={handleClick} class="btn">
          Would like another estimates !
        </button>
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

  console.log(JSON.stringify(quote));
  //get the addressId from cookie

  let { addressId } = parseCookie(req);
  console.log("Address --" + addressId);
  const addressAPI = `${STRAPI_API_URL}/addresses/${addressId}`;
  console.log(addressAPI);
  let resAddressFetch = await fetch(addressAPI);
  let address = await resAddressFetch.json();

  console.log(JSON.stringify(address));

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
