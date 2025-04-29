
import { MdOutlineErrorOutline } from "react-icons/md";
import React from "react";
import { SVGLoader } from "./SVGLoader";



// SVGLoader Fetch
const SVGLoaderFetch = ({ colSpan, text }: any) => (
  <tr>
    <td colSpan={colSpan} id="table-loader">
      <div className="center-content">
        <SVGLoader width={"40px"} height={"40px"} color={"#0866FF"} />

        <p className="mt-3">{text}</p>
      </div>
    </td>
  </tr>
);

// NoRecordFound
const NoRecordFound = ({ colSpan }: any) => (
  <tr>
    <td colSpan={colSpan} id="table-loader">
      <div className="center-content">
        <MdOutlineErrorOutline size={75} />
        <p id="mt-3">No record found</p>
      </div>
    </td>
  </tr>
);
// NoRecordFound
const NoRecordFoundD = ({ colSpan }: any) => (

  <div className="center-content" id="table-loader">
    <MdOutlineErrorOutline size={75} />
    <p id="mt-3">No record found</p>
  </div>
);




const CapitalizeFirstLetter = (str: string | undefined | any) => {
  return str ? str?.charAt(0).toUpperCase() + str?.slice(1) : "";
};


// Color Functions
const getRandomColor = () => {
  const colors = ['#00A36C', '#EE1514', '#00A52C', '#FF8C00', '#C67003', '#14539A', '#02393E', '#275D2B', '#660D33', '#6F4439'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getContrastingColor = (color: string) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const invertedColor = `#${(0xFFFFFF ^ (r << 16 | g << 8 | b)).toString(16).padStart(6, '0')}`;
  return invertedColor;
};



const parseApiDate = (dateString: string | null): { day: number; month: number } | null => {
  if (!dateString) return null;
  const parsedDate = new Date(dateString);
  return {
    day: parsedDate.getDate(),
    month: parsedDate.getMonth(),
  };
};



const getInitials = (name: string | null | undefined) => {
  if (!name) return null;
  const parts = name.split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`
    : parts[0][0];
};



export {
  NoRecordFound,
  SVGLoaderFetch,
  NoRecordFoundD,
  parseApiDate,
  CapitalizeFirstLetter,
  getRandomColor,
  getContrastingColor,
  getInitials,
};
