import React from 'react';
import styles from './signupnavbar.module.css';

const SignupNavbar = () => {
  return (
    <header className={styles.head}>
      <img
        src="https://assets.pharmeasy.in/web-assets/dist/fca22bc9.png"
        alt="logo"
      />
      <div className={styles.headright}>
        <img
          src="https://assets.pharmeasy.in/web-assets/dist/1fe1322a.svg"
          alt="logo2"
        />
      </div>
    </header>
  );
};

export default SignupNavbar;
