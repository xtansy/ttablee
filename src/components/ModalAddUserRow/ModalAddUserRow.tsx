import styles from "./styles.module.scss";

import { FC } from "react";
import { FormCreateUser } from "..";
import { Button, Modal } from "../../shared";
import { type TValidationData } from "../../shared/columns";
import { type IUserWithoutId } from "../../shared/entityTypes";

interface IModalAddUserRowProps {
  validationData: TValidationData[];
  onSubmit?: (data: IUserWithoutId) => void;
  isOpen?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  isLoading?: boolean;
}

export const ModalAddUserRow: FC<IModalAddUserRowProps> = ({
  validationData,
  onSubmit,
  isOpen = false,
  closeModal,
  isLoading = false,
  openModal,
}) => {
  const onClickOpen = () => {
    openModal?.();
  };

  const onClickClose = () => {
    closeModal?.();
  };

  const onClickSubmit = (data: IUserWithoutId) => {
    onSubmit?.(data);
  };
  return (
    <>
      <Button
        isLoading={isLoading}
        className={styles.button}
        onClick={onClickOpen}
      >
        Добавить запись
      </Button>

      <Modal
        title="Добавить пользователя"
        isOpen={isOpen}
        onClose={onClickClose}
      >
        <FormCreateUser
          isLoading={isLoading}
          validationData={validationData}
          onSubmit={onClickSubmit}
        />
      </Modal>
    </>
  );
};
