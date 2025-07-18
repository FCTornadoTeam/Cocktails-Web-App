import Image from "next/image";
import styles from "./Card.module.scss";

type Card = {
  title: string;
  image: string;
  category: string;
  tags?: string | null;
};

export const Card: React.FC<Card> = ({ title, image, category, tags }) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>{title}</h3>
        <button className={styles.card_favorite_button}></button>
      </div>
      <div className={styles.card_image_wrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.card_image}
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className={styles.card_description}>{category}</p>
      <div className={styles.card_tags}>
        {typeof tags === "string" && tags
          ? tags.split(",").map((tag, index) => (
              <div key={index} className={styles.tag}>
                {tag.trim()}
              </div>
            ))
          : null}
      </div>
      <a href="#" className={styles.card_details_link}>
        <div className={tags ? styles.card_details_button : styles.card_details_button_down}>Details</div>
      </a>
    </div>
  );
};
