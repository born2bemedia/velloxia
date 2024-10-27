import React from "react";

const PlusIcon = () => {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25.5"
        cy="25.5"
        r="25"
        transform="rotate(90 25.5 25.5)"
        stroke="#555555"
      />
      <path
        d="M16 25H34.5"
        stroke="#1FA169"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M25 16L25 34.5"
        stroke="#1FA169"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PlusIcon;
