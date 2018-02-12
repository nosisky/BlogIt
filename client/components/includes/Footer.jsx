import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer center">
      <div className="footer-copyright">
        <div className="container">
          &copy; {new Date().getFullYear()} Copyright{' '}
          <a className="grey-text text-lighten-3"
            href="http://github.com/nosisky">
            <b>Abdulrasaq Nasirudeen</b>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
