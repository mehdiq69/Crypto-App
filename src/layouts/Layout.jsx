import React from "react";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="https://google.com">Google.com</a>
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Mehdi With ❤️</p>
      </footer>
    </>
  );
}

export default Layout;
