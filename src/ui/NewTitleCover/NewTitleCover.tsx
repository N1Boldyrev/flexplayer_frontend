import styles from "./styles.module.scss";
import { ReactComponent as PlusIcon } from "assets/plus.svg";

interface NewTitleCoverProps {
  onClick?: () => void;
}

export const NewTitleCover = (props: NewTitleCoverProps) => {
  const { onClick = () => {} } = props;
  return (
    <div className={styles.wrapper} onClick={() => onClick()}>
      <div className={styles.newTitleCover}>
        <PlusIcon />
      </div>
    </div>
  );
};
