


import React from "react";

const FloatingScrollbar = ({ children, className = "", style = {} }) => {
  return (
    <div className={`relative overflow-scroll pb-4 ${className}`} style={style}>
      <div className="absoulte overflow-x-scroll whitespace-nowrap ">
        {children}
      </div>
    </div>
  );
};

export default FloatingScrollbar;