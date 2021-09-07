import { useState } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as RefreshIcon } from "assets/refresh.svg";

interface TitleCoverProps {
  image?: string;
  name: string;
  onUpdate: () => void;
}

export const TitleCover = (props: TitleCoverProps) => {
  const { name, onUpdate, image } = props;

  const [coverHovered, setCoverHovered] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.titleCover} ${coverHovered && styles.hovered}`}
        style={{ backgroundImage: "url(/valakas.jpeg)", backgroundSize: "100%", backgroundRepeat: "no-repeat" }}
        onMouseOver={() => setCoverHovered(true)}
        onMouseOut={() => setCoverHovered(false)}
      >
        <div className={styles.refresh}>
          <button>
            <RefreshIcon />
          </button>
        </div>
        <div className={styles.divider}>
          <></>
        </div>
        <div className={styles.titleName}>Valakas</div>
      </div>
    </div>
  );
};
