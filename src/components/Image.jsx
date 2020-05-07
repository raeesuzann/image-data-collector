import React from "react";
import "./Image.css";

const Image = (props) => {
  const { id, download_url, author, userStatus } = props.image;
  const { imageOkay, imageBad } = props;
  return (
    <div>
      <div className="image-container">
        <img
          src={download_url}
          width="200"
          height="200"
          alt={`${author}${id}`}
        />
        {userStatus !== null && (
          <div className="content-feedback">
            {userStatus ? (
              <span className="content liked">
                <i className="fas fa-thumbs-up"></i>
              </span>
            ) : (
              <span className="content disliked">
                <i className="fas fa-thumbs-down"></i>
              </span>
            )}
          </div>
        )}
      </div>
      <div className={`button-container`}>
        <span
          className={`content like ${userStatus === true && "liked"}`}
          onClick={() => imageOkay(id)}
        >
          <i className="fas fa-thumbs-up"></i>
        </span>
        <span
          className={`content dislike ${userStatus === false && "disliked"}`}
          onClick={() => imageBad(id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </span>
      </div>
    </div>
  );
};

export default Image;
