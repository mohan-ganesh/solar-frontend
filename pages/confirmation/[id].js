import Layout from "../../components/common/Layout";
import { STRAPI_API_URL } from "../../config/config";
import styles from "../../styles/Confirmation.module.css";
import "react-toastify/dist/ReactToastify.css";
import cookie from "cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

/**
 * Displays the estimates and referece number for follow up
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
    <Layout title="Confirmation Step">
      <div className="center">
        <div className={styles.cardConfirm}>
          Great! based on the information provided, estimated average
          <b>&nbsp;monthly&nbsp;</b>
          savings bill will be
          <b>
            &nbsp;<span className={styles.green}>{savings.savings}</span>
            &nbsp;$&nbsp;
          </b>{" "}
          and estimated cost to install solar panel array would be
          <b>
            &nbsp;<span className={styles.green}>{savings.estimate}</span>
            &nbsp;$&nbsp;
          </b>
          .
        </div>
        <div className={styles.cardConfirm}>
          The address is{" "}
          <b>
            &nbsp;<span className={styles.green}>{address.address}</span>&nbsp;
          </b>
          . You can refer the quote id
          <b>
            &nbsp;<span className={styles.green}>{quote.id}</span>&nbsp;
          </b>{" "}
          to get more details. We would like to run this infomation against our
          machine learning model to get more accuare details.
        </div>
        &nbsp; &nbsp;
        <div>
          <button type="submit" onClick={handleClick} className="btn">
            Would you like to get estimates for another location
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

/**
 * Fetch the quote and address details
 * Caclucate the savings and possible estimate details
 * Run against machine model
 * @param {*} param0
 * @returns
 */
export async function getServerSideProps({ query: { id }, req }) {
  const quoteEndPoint = `${STRAPI_API_URL}/quotes/${id}`;
  const resQuoteFetch = await fetch(quoteEndPoint);
  let quote = await resQuoteFetch.json();

  //get the addressId from cookie
  let { addressId } = parseCookie(req);

  const addressAPI = `${STRAPI_API_URL}/addresses/${addressId}`;

  let resAddressFetch = await fetch(addressAPI);
  let address = await resAddressFetch.json();

  //This is where we use all of the information such as longitude, latidude, address
  //house member details etc to run againt ML model and get the estimates
  //I'm just doing random logic here,but one should pass this ML model api
  //calculate the savings
  let calcEstimate = Math.floor(Math.random() * 100 + 400);
  let calcSavings = Math.floor(Math.random() * 100 + 500);
  let savings = {
    estimate: calcEstimate,
    savings: calcSavings,
  };

  return {
    props: {
      quote: quote,
      address: address,
      savings: savings,
    },
  };
}
