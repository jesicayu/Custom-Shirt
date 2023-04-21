import React from "react";
import { ReactComponent as ShirtLong } from "../assets/custom_long.svg";
import { ReactComponent as ShirtShort } from "../assets/custom_short.svg";
import { ReactComponent as ShirtTank } from "../assets/custom_tank.svg";
import "../../src/style.css";

const PopUp = ({ color, urlImg, state, setState, style }) => {
  const ComponentRender = ({ style, fill }) => {
    switch (style) {
      case "tank":
        return <ShirtTank style={fill}/>;
      case "long":
        return <ShirtLong style={fill}/>;
      case "short":
        return <ShirtShort style={fill}/>;
      default:
        break;
    }
  };

  return (
    <div className="flex  justify-center items-center">
      {state && (
        <div className="div-container">
          <p onClick={() => setState(false)} className="close">
            X
          </p>
          <div className="svg-shirt">
            <ComponentRender fill={{ fill: color }} style={style} />
            <div className="urlImg-container">
              {urlImg ? (
                <img src={urlImg} alt="image custom svg" width="60%" />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
