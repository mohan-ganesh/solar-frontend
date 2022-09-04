import Layout from "../../components/common/Layout";
import { STRAPI_API_URL } from "../../config/config";
import styles from "../../styles/Form.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { cookie, useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 *
 * @param {*} context
 * @returns
 */
export async function getServerSideProps(context) {
  const mapUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.API_KEY}&place_id=${context.params.id}&fields=formatted_address,name,photos,place_id,types,geometry`;
  const res = await fetch(mapUrl);
  const resJson = await res.json();

  let retAddress = {};

  if (resJson.status === "OK") {
    let addressEndPoint = "`${STRAPI_API_URL}/addresses`";

    var address = JSON.stringify({
      address: resJson.result.formatted_address,
      lat: resJson.result.geometry.location.lat,
      lng: resJson.result.geometry.location.lng,
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
 * @param {*} address data
 * @returns
 */
export default function AddressDetails({ data }) {
  // for navigation
  const router = useRouter();

  //addressId state maintaince
  const [addressId, setAddressId] = useCookies(["addressId"]);

  //form values state
  const [values, setValues] = useState({
    squareFoot: "",
    year: "",
    members: "",
    solarSize: "",
  });

  //handle the form submit event

  const handleSubmit = async (event) => {
    //stop the form from submitting
    event.preventDefault();

    //Gater the data from form

    const formData = {
      squareFoot: event.target.squareFoot.value,
      year: event.target.year.value,
      members: event.target.members.value,
      solarSize: event.target.solarSize.value,
    };

    //data Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    //alert user for empty fields
    if (hasEmptyFields) {
      toast.error("Please fill in all fields.");
      return;
    }

    //data is good and send it to API
    const quoteEndPoint = `${STRAPI_API_URL}/quotes`;

    const quoteResponse = await fetch(quoteEndPoint, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!quoteResponse.ok) {
      toast.error("Something went wrong");
      return;
    } else {
      const quoteResponseData = await quoteResponse.json();
      setAddressId("addressId", `${data.retAddress.id}`, { path: "/" });
      router.push(`/confirmation/${quoteResponseData.id}`);
    }
  }; //end of handlesubmit

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  //html
  return (
    <Layout>
      <div className="center">
        <div className="card">
          You have selected the address&nbsp;
          <span className="cardHighlight">
            {data.resJson.result.formatted_address}
          </span>
          &nbsp;to get the quote. Please provide the additional details to to
          get the accuarate estimates.
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
          autoComplete="0ff"
        >
          <div className={styles.grid}>
            <label htmlFor="name">Square Foot </label>
            <input
              type="text"
              id="squareFoot"
              name="squareFoot"
              onChange={handleInput}
              value={values.squareFoot}
            />
          </div>
          <div className={styles.grid}>
            <label htmlFor="name">Built year </label>
            <input
              type="number"
              id="year"
              name="year"
              onChange={handleInput}
              value={values.year}
            />
          </div>
          <div className={styles.grid}>
            <label htmlFor="name">
              Number of members that live in your household
            </label>
            <input
              type="number"
              id="member"
              name="members"
              onChange={handleInput}
              value={values.members}
            />
          </div>
          <div className={styles.grid}>
            <label htmlFor="name">Appraximate solar size </label>
            <input
              type="text"
              id="solarSize"
              name="solarSize"
              onChange={handleInput}
              value={values.solarSize}
            />
          </div>
          <ToastContainer />
          &nbsp;
          <div>
            <button type="submit" className="btn">
              Get my Estimates
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
