import React from "react";
import "./Image.css";

const Image = (props) => {
  const { id, download_url, author, userStatus } = props.image;
  const { imageOkay, imageBad } = props;
  return (
    <div className="image-box-container">
      <div className="image-container">
        <img
          src={download_url}
          width="250"
          height="200"
          alt={`${author}${id}`}
        />
        {userStatus !== null && (
          <div className="content-feedback">
            {userStatus ? (
              <span className="feedback liked">
                <i className="fas fa-thumbs-up"></i>
              </span>
            ) : (
              <span className="feedback disliked">
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
