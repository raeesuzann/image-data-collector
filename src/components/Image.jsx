import React from "react";
import "./Image.css";

import { Button } from "./Button";

const Image = (props) => {
  const { id, download_url, author, userStatus } = props.image;
  const { imageOkay, imageBad } = props;
  return (
    <div>
      <img src={download_url} width="200" height="200" alt={`${author}${id}`} />
      {userStatus !== undefined ? (
        <p>{userStatus ? "Okay" : "Bad"}</p>
      ) : (
        <div className={`button-container`}>
          <Button like className="like" onClick={() => imageOkay(id)}>
            Okay
          </Button>
          <Button bad className="bad" onClick={() => imageBad(id)}>
            Bad
          </Button>
        </div>
      )}
    </div>
  );
};

export default Image;
