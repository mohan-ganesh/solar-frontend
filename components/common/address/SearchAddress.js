import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import style from "../../../styles/Address.module.css";
/**
 *
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

  function handleInput() {
    router.push(`/address/${place}`);
  }
  return (
    <div className="bg-white shadow p-10 rounded">
      {loadError && (
        <div>Google Map script can't be loaded, please reload the page</div>
      )}
      {isLoaded && (
        <React.Fragment>
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">
            Search Place !!
          </h1>
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
                  className={style.search}
                  placeholder="enter address to install solar panel!"
                  onKeyPress={onKeypress}
                  autoComplete="off"
                />
              </Autocomplete>
            </div>
          </form>
        </React.Fragment>
      )}
      <p>&nbsp;</p>
      <button type="submit" className="btn" onClick={handleInput}>
        Let's Get Started!!
      </button>
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
