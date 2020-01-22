import React from 'react';
export default () => {
  return (
    <div className="wrapper">
      <h1 className="title">Coming soon</h1>
      <div className="body">
        We currently support desktop view only. <br /> Mobile view is coming
        soon!
      </div>
      <br />
      <a href="https://TODO.YOUR.URL">
        <div className="back-home-btn">
          <button>Go to homepage</button>
        </div>
      </a>
      {/* tslint:disable-next-line */}
      <style jsx>{`
        .wrapper {
          margin-top: 35vh;
          text-align: center;
        }
        .title {
          font-size: 38px;
          font-weight: bold;
        }
        .body {
          color: rgba(0, 0, 0, 0.25);
        }
        .back-home-btn {
          margin-top: 2vh;
        }
      `}</style>
    </div>
  );
};
