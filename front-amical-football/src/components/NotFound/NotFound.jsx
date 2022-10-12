import React from 'react';
import HeaderNav from '../HeaderNav/HeaderNav';

import './NotFound.scss';

const NotFound = () => (
  <div className="app__notfound">
    <HeaderNav />
    <div className="app__notfound-gif">
      <p className="title">404 PAGE NOT FOUND</p>
      <p className="text">En voila un qui va prendre sa douche avant les autres</p>
      <img src="https://media.giphy.com/media/QVeuWutuSHqaEm3Sd3/giphy-downsized-large.gif" alt="" />

    </div>

  </div>
);

export default NotFound;
