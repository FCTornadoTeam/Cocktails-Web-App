import Image from "next/image";
import styles from "./Card.module.scss";
import exampleCocktail from "../../public/image.png";

export const Card = () => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>Title</h3>
        <button className={styles.card_favorite_button}></button>
      </div>
      <Image
        src={exampleCocktail}
        alt="Cocktail"
        className={styles.card_image}
        width={300}
        height={200}
      />
      <p className={styles.card_description}>Category</p>
      <div className={styles.card_tags}>
        <div className={styles.tag}>Tag</div>
        <div className={styles.tag}>Tag</div>
        <div className={styles.tag}>Tag</div>
        <div className={styles.tag}>Tag</div>
      </div>
      <a href="#" className={styles.card_details_link}>
        <div className={styles.card_details_button}>Details</div>
      </a>
    </div>
  );
};
