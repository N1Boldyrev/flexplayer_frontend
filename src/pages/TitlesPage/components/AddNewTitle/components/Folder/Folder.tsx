import React from "react";
import { ReactComponent as FolderIcon } from "../../../../../../assets/folder.svg";
import styles from "./styles.module.scss";

interface FolderProps {
  name: string;
  onClick: () => void;
}

export const Folder = (props: FolderProps) => {
  const { name, onClick } = props;

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className={styles.folder} onClick={(e) => onClickHandler(e)}>
      <div className={styles.icon}>
        <FolderIcon />
      </div>
      <div>{name}</div>
    </button>
  );
};
