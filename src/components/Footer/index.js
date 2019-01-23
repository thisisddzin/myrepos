import React, { Fragment } from 'react';

import FooterStyle from './style';

const Footer = () => (
  <Fragment>
    <FooterStyle />
    <details>
      <summary>
        <small>
          Developed by:
          {' '}
          <a
            href="https://www.adenilson-santos.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @adenilson-santos
          </a>
        </small>
      </summary>
      <p>
        Este é um projeto de código aberto, veja seu repositório no
        {' '}
        <a href="https://www.adenilson-santos.github.io/" target="_blank" rel="noopener noreferrer">
          Github
          {' '}
          <i className="fab fa-github" />
        </a>
      </p>
    </details>
  </Fragment>
);

export default Footer;
