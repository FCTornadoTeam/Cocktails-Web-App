import { Card } from "../Card/Card";
import styles from "./ResultPage.module.scss";

export const ResultPage = () => {
  return (
    <div className={styles.resultPage_container}>
      <h2 className={styles.title}>Search results <span className={styles.itemsCount_text}>13 items</span></h2>
    <div className={styles.cards_grid}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    </div>
  );
};
