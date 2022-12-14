import { useRef, useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { AiFillCar } from "react-icons/ai";
import { BiCurrentLocation, BiCycling } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { FaWalking } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { Wrapper } from "@googlemaps/react-wrapper";
import Geocode from "react-geocode";

import "./Map.scss";
import ButtonBack from "../Button/ButtonBack";
import { useEffect } from "react";
import { getAHotel } from "../../store/actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Map() {
  Geocode.setApiKey(process.env.REACT_APP_MAP_API);
  Geocode.setLanguage("vi");
  Geocode.setRegion("vn");

  const params = useParams();
  const dispatch = useDispatch();
  const { aHotel } = useSelector((state) => state.data);

  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showControl, setShowControl] = useState(true);
  const [center, setCenter] = useState({
    lat: 10.8225079,
    lng: 106.6880955,
  });

  const [distance, setDistance] = useState("0km");
  const [duration, setDuration] = useState("0h");

  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const mapInputRef = useRef(null);

  const travelList = [
    {
      icon: AiFillCar,
      value: "DRIVING",
    },
    {
      icon: BiCycling,
      value: "BICYCLING",
    },
    {
      icon: FaWalking,
      value: "WALKING",
    },
  ];

  const containerStyle = {
    width: "100%%",
    height: "100%",
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDistance(response.routes[0].legs[0].distance.text);
        setDuration(response.routes[0].legs[0].duration.text);
        setResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
  };

  const handleChangeTravelMode = (value) => {
    setTravelMode(value);
  };

  const onSubmit = () => {
    const origin = originRef.current.value;
    const destination = destinationRef.current.value;
    setOrigin(origin);
    setDestination(destination);
    hanldeShowInputControl();
  };

  const hanldeShowInputControl = () => {
    if (showControl) {
      mapInputRef.current.style.height = "0%";
      mapInputRef.current.style.padding = "0";
      setShowControl(false);
    } else {
      mapInputRef.current.style.height = "50%";
      mapInputRef.current.style.padding = "20px";
      setShowControl(true);
    }
  };

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCenter(pos);
      }
    );
  }, []);

  useEffect(() => {
    if (params.name) {
      getAHotel(dispatch, params.name);
      setDestination(aHotel.address);
      Geocode.fromLatLng("10.8157638", "106.6785122").then(
        (response) => {
          const address = response.results[0].formatted_address;
          setOrigin(address);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [dispatch, params.name, aHotel.address]);

  return (
    <div className="map">
      <ButtonBack left={10} />
      <div
        className={`map__open ${!showControl && "show"}`}
        onClick={hanldeShowInputControl}
      >
        <IoIosArrowUp className="map__icon-arrow map__arrow-up" />
      </div>

      <div className="map__body">
        <Wrapper apiKey={process.env.REACT_APP_MAP_API} libraries={["places"]}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            defaultZomm={14}
            options={{
              fullscreenControl: false,
              zoomControl: false,
            }}
          >
            {destination !== "" && origin !== "" && (
              <DirectionsService
                // required
                options={{
                  destination: destination,
                  origin: origin,
                  travelMode: travelMode,
                }}
                // required
                callback={directionsCallback}
              />
            )}
            {response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  directions: response,
                }}
              />
            )}
            <div ref={mapInputRef} className="map__input-wrap">
              <div className="map__close" onClick={hanldeShowInputControl}>
                <IoIosArrowDown className="map__icon-arrow" />
              </div>
              <div className="map__detail">
                <p className="map__duration">{distance}</p>
                <p className="map__duration">{duration}</p>
              </div>
              <div className="input__item">
                <HiLocationMarker className="map__icon" />
                <Autocomplete className="input__inp">
                  <input
                    type="text"
                    ref={destinationRef}
                    placeholder="Nh???p ?????a ??i???m n??i ?????n"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </Autocomplete>
              </div>
              <div className="input__item">
                <BiCurrentLocation className="map__icon" />
                <Autocomplete className="input__inp">
                  <input
                    type="text"
                    ref={originRef}
                    placeholder="Nh???p ?????a ??i???m c???a b???n"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </Autocomplete>
              </div>
              <div className="select__wrap">
                {travelList.map((item, index) => (
                  <div
                    className={`select__item ${
                      travelMode === item.value && "active"
                    }`}
                    onClick={() => handleChangeTravelMode(item.value)}
                    key={index}
                  >
                    <item.icon className="select__icon" />
                    <span className="select__title" data={`${item.value}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <button className="input__submit" onClick={onSubmit}>
                Build route
              </button>
            </div>
          </GoogleMap>
        </Wrapper>
      </div>
    </div>
  );
}

export default Map;
