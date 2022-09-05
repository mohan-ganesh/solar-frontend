import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import style from "../../../styles/Address.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

/**
 *
 * Populate the selected address details
 * @returns
 */
export default function SearchAddresses() {
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript(scriptOptions);
  const [autocomplete, setAutocomplete] = useState(null);
  const inputEl = useRef(null);
  const [place, setPlace] = useState("");
  //Handle the keypress for input
  const onKeypress = (e) => {
    // On enter pressed
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  //keyboad default submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onLoad = (autocompleteObj) => {
    setAutocomplete(autocompleteObj);
  };

  const onPlaceChanged = (e) => {
    if (autocomplete) {
      const place = autocomplete.getPlace();

      if ("place_id" in place) {
        setPlace(`${place.place_id}`);
      }
    }
  };

  /**
   * check for data accuracy
   */
  function handleInput() {
    if (`${place}` === "") {
      toast.error("Enter a location to proceed to next step.");
      return;
    } else {
      router.push(`/address/${place}`);
    }
  }
  return (
    <div className="bg-white shadow p-10 rounded">
      {loadError && (
        <div>Google Map script can't be loaded, please reload the page</div>
      )}
      {isLoaded && (
        <React.Fragment>
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <Autocomplete
                onLoad={onLoad}
                fields={["place_id"]}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  ref={inputEl}
                  type="text"
                  className={style.searchbox}
                  placeholder="Enter a location"
                  onKeyPress={onKeypress}
                  autoComplete="off"
                />
              </Autocomplete>
            </div>
          </form>
        </React.Fragment>
      )}
      <p>&nbsp;</p>
      <div className="center">
        <button type="submit" className="btn" onClick={handleInput}>
          Let's Get Started
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

/**
 *Load the Google Map API key
 */
const scriptOptions = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  libraries: ["places"],
};
