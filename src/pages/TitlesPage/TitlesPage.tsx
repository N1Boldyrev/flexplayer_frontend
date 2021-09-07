import { useStore, useGate } from "effector-react";
import { TitlesLayout } from "layouts/TitlesLayout";
import { TitleCover } from "ui/TitleCover";
import { NewTitleCover } from "ui/NewTitleCover";
import { Modal } from "ui/Modal";
import { AddNewTitle } from "./components/AddNewTitle";
import { titleService } from "services/titles-service";
import styles from "./styles.module.scss";

const TitlesPage = () => {
  const { titlesGate, $state, setModalOpen } = titleService;
  useGate(titlesGate);
  const { isModalOpen } = useStore($state);

  return (
    <>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <AddNewTitle />
      </Modal>
      <TitlesLayout>
        <div className={styles.wrapper}>
          <TitleCover name={"kek"} onUpdate={() => {}} />
          <TitleCover name={"kek"} onUpdate={() => {}} />
          <TitleCover name={"kek"} onUpdate={() => {}} />
          <TitleCover name={"kek"} onUpdate={() => {}} />
          <TitleCover name={"kek"} onUpdate={() => {}} />
          <TitleCover name={"kek"} onUpdate={() => {}} />
          <NewTitleCover onClick={() => setModalOpen(true)} />
        </div>
      </TitlesLayout>
    </>
  );
};

export default TitlesPage;
