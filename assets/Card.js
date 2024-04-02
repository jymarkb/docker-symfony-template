import React from "react";
const Card = ({ data }) => {
  // random hex color for avatar background
  const updateBackgroundAvatar = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + "0".repeat(6 - randomColor.length) + randomColor;
  };

  return (
    <div className="card-wrapper">
      <div className="left-wrapper">
        <div className="card-solid">
          <div
            className="avatar-wrapper"
            style={{ backgroundColor: updateBackgroundAvatar() }}
          >
            <img
              className="card-solid-avatar"
              loading="lazy"
              src={`${data.avatar}`}
            />
          </div>
        </div>

        <div className="card-info">
          <h2 className="card-info-name">{`${data.fname} ${data.lname}`}</h2>
          <p className="card-info-title">{data.title}</p>
        </div>
      </div>

      <div className="right-wrapper">
        <div className="divider first"></div>
        <div className="card-info-description">
          <p>
            <strong>"</strong>
            {data.description}
            <strong>"</strong>
          </p>
        </div>

        <div className="divider second"></div>

        <div className="card-skill">
          <ul className="card-skill-wrapper">
            {data.skills.map((data, index) => {
              return <li key={index}>{data}</li>;
            })}
          </ul>
        </div>

        <div className="card-social">
          <button>
            <i className="fa-brands fa-instagram"></i>
          </button>
          <button>
            <i className="fa-brands fa-facebook-f"></i>
          </button>
          <button>
            <i className="fa-brands fa-linkedin-in"></i>
          </button>
          <button>
            <i className="fa-solid fa-at"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;