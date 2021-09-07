import React, { useState } from "react";
import { Folder } from "./components/Folder";
import { ReactComponent as BackIcon } from "../../../../assets/back.svg";
import styles from "./styles.module.scss";
import { Input } from "ui/Input";
import { Button } from "ui/Button";

interface FoldersProps {
  onSelect: (name: string) => void;
}

interface TitlesCreationProps {
  onBack: () => void;
}

const Folders = (props: FoldersProps) => {
  const { onSelect } = props;

  return (
    <div className={styles.selectFolder}>
      <h1>Add new title</h1>
      <h3>Select folder with title</h3>
      <div className={styles.folderList}>
        <Folder name={"kek"} onClick={() => onSelect("kek")} />
      </div>
    </div>
  );
};

const TitleCreation = (props: TitlesCreationProps) => {
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onBack();
  };

  return (
    <div className={styles.titleCreation}>
      <div className={styles.backButton}>
        <button onClick={(e) => handleBack(e)}>
          <BackIcon />
        </button>
      </div>
      <h1>Give a name to the title</h1>
      <form action="">
        <Input label={"Title name"} value={"kek"} variant={"light"} style={{ width: "300px" }} />
        <Button variant={"light"}>Ok</Button>
      </form>
    </div>
  );
};

export const AddNewTitle = () => {
  const [selectedFolder, selectFolder] = useState<string>("");

  return (
    <div className={styles.addNewTitle}>
      {selectedFolder ? <TitleCreation onBack={() => selectFolder("")} /> : <Folders onSelect={selectFolder} />}
    </div>
  );
};
