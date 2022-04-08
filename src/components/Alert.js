import React, { useEffect } from "react";

function Alert({ type, msg, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <div className={`alert ${type}`}>
      <h4>{msg}</h4>
    </div>
  );
}

export default Alert;
