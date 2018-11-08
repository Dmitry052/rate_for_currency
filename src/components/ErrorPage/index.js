/* global Raven */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, no-unused-expressions */
import React from 'react';

const ErrorPage = () => (
  <div
    className="snap"
    onClick={() => {
      Raven.lastEventId() && Raven.showReportDialog();
    }}
  >
    <center>
      <p>We are sorry — something is gone wrong.</p>
      <p>Our team has been notified, but click here fill out a report.</p>
    </center>
  </div>
);

export default ErrorPage;
