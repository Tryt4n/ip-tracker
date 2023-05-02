import { useRef, useState } from "react";

import ipaddr from "ipaddr.js";

export default function IpInput({ setIp, isValidIp, setIsValidIp }) {
  const [value, setValue] = useState("");
  const [hasColon, setHasColon] = useState(false);
  const [hasDot, setHasDot] = useState(false);
  const ipRef = useRef(null);
  const [ipValidation, setIpValidation] = useState(false);

  function checkValidity(value) {
    try {
      const ipValue = ipaddr.parse(value);
      if (ipValue.kind() === "ipv4" || ipValue.kind() === "ipv6") {
        setIpValidation(true);
      } else {
        setIpValidation(false);
      }
    } catch (error) {
      setIpValidation(false);
    }
  }

  function changeIp(inputValue) {
    if (isValidIp) {
      setIp(inputValue.current.value);
    }
    ipValidation ? setIsValidIp(true) : setIsValidIp(false);
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    const newValue = inputValue.toLowerCase();
    const regex = /([.:])\1+/g;
    const sanitizedValue = newValue.replace(regex, "$1");

    const validRegex = /^[a-z0-9.:]+$/;
    const isValid = validRegex.test(sanitizedValue);

    //* Validate that ":" cannot be entered if "."
    if (hasDot && inputValue.includes(":")) {
      return;
    }

    //* Validate that "." cannot be entered if ":"
    if (hasColon && inputValue.includes(".")) {
      return;
    }

    //* Update of variables that store information about whether the ":" or "." is used
    if (!hasColon && sanitizedValue.includes(":")) {
      setHasColon(true);
      setHasDot(false);
    }
    if (!hasDot && sanitizedValue.includes(".")) {
      setHasDot(true);
      setHasColon(false);
    }

    //* Reset of variables that store information about whether the ":" or "." is used
    if (!sanitizedValue.includes(":") && !sanitizedValue.includes(".")) {
      setHasDot(false);
      setHasColon(false);
    }

    //* Prevents "." or ":" from being entered as the first character
    //* And setting the final value
    if (
      (isValid && sanitizedValue[0] !== ":" && sanitizedValue[0] !== ".") ||
      sanitizedValue === ""
    ) {
      checkValidity(sanitizedValue);
      setValue(sanitizedValue);
    }
  }

  return (
    <form
      className="input-container"
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        htmlFor="ip-input"
        className="visually-hidden"
      >
        Enter searching IP address
      </label>
      <input
        type="text"
        name="ip-input"
        id="ip-input"
        className="input-container__input"
        placeholder="Search for any IP address or domain"
        maxLength={39}
        ref={ipRef}
        value={value}
        onChange={handleChange}
      />
      <button
        className="input-container__btn"
        onClick={() => changeIp(ipRef)}
      >
        <img
          src="./images/icon-arrow.svg"
          alt="arrow icon"
          aria-hidden
        />
        <span className="visually-hidden">Check entered IP address</span>
      </button>
    </form>
  );
}
