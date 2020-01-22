import React from 'react';

export default () => {
  return (
    <div className="wrapper">
      {/* TODO: improve */}
      <h1 className="title">404</h1>

      <div>Sorry, we can't find the page you're looking for</div>
      <div className="back-home-btn">
        <button>Back Home</button>
      </div>
      {/* tslint:disable-next-line */}
      <style jsx>{`
        .wrapper {
          margin-top: 10vh;
          text-align: center;
        }
        .title {
          font-size: 38px;
          font-weight: bold;
        }
        .back-home-btn {
          margin-top: 2vh;
        }
      `}</style>
    </div>
  );
};
