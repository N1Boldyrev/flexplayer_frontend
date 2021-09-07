import { combine, createDomain } from "effector";
import { createGate } from "effector-react";

const titlesDomain = createDomain("titles domain");
const gate = createGate({ domain: titlesDomain });

const setNewTitleModalOpen = titlesDomain.createEvent<boolean>();

const $newTitleModalOpened = titlesDomain.createStore(false);
$newTitleModalOpened.reset(gate.close);
$newTitleModalOpened.on(setNewTitleModalOpen, (_, isOpen) => isOpen);

export const titleService = {
  titlesGate: gate,
  setModalOpen: setNewTitleModalOpen,
  $state: combine({
    isModalOpen: $newTitleModalOpened,
  }),
};
