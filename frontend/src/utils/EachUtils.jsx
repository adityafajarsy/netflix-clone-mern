import React, { Children } from "react";

// const EachUtils = ({ of, render }) => {
//   return <>{Children.toArray(of.map((item, index) => render(item, index)))}</>;
// };

const EachUtils = ({ of, render }) => {
  if (!of || !Array.isArray(of)) return null;
  return <>{Children.toArray(of.map((item, index) => render(item, index)))}</>;
};

export default EachUtils;
