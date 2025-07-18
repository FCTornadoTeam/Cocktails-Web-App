import styles from "./page.module.scss";

import { Header } from "@/components/Header/Header";
import { ResultPage } from "@/components/ResultPage/ResultPage";
import { SearchBy } from "@/components/SearchBy/SearchBy";

export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles.mainPage_container}>
        <SearchBy />
        <ResultPage />
      </div>
    </div>
  );
}
