import  { useRef } from "react";

import DisplayMap from "../DisplayMap/DisplayMap";
import useGet from "../../hooks/useGet";
import { IMarker } from "../../Types";
import { BASE_URL } from "../../config/config";

const URL = BASE_URL + "api/analysis/highest-casualty-regions/?";

export default function MostCasultyRegions() {
  const { data, getData, errMsg } = useGet<IMarker>();
  const regionType = useRef("region");
  function handleSend() {
    // e.preventDefault()
    getData(URL, `regionType=${regionType.current}`);
    // console.log(data)
  }

  return (
    <>
      <div className="center">
        <form className="regular">
          <select onChange={(e) => (regionType.current = e.target.value)}>
            <option value="region">Regions avarage</option>
            <option value="country">Country avarage</option>
            <option value="city">City avarage</option>
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            submit
          </button>
        </form>
      </div>
      <p className="msg">{errMsg}</p>
      <DisplayMap
        markers={data.filter((loc) => loc.location[0])}
        height="500px"
      ></DisplayMap>
    </>
  );
}
