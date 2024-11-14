import React from "react";

const Error = ({ error }) => {
  return (
    <p className="error" style={{ marginBottom: "10px" }}>
      <span>💥</span> {error}
    </p>
  );
};

export default Error;
