import { createGlobalStyle } from 'styled-components';

const FooterStyle = createGlobalStyle`
  details {
    width: 100%;
    height: 30px;
    color: white;
    text-align: center;
    color: black;

    a {
      color: dodgerblue;
      text-decoration: none;
    }

    p{
      margin: 5px 0;
    }
  }
`;

export default FooterStyle;
