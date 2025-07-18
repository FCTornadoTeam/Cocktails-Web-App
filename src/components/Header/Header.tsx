import styles from "./Header.module.scss";
import Image from "next/image";
import heart from "../../public/icons/heart.svg";
import plus from "../../public/icons/plus.svg";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Logo</h1>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Image src={heart} alt="Heart icon" width={20} height={20} /> My
              <a href="/about" className={styles.navItem}>
                list
              </a>
            </li>
            <li className={styles.li}>
              <Image src={plus} alt="Plus icon" width={20} height={20} />
              <a href="/blog" className={styles.navItem}>
                Add new
              </a>
            </li>
            <li className={styles.li}>
              <button className={styles.button}>Log out</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
