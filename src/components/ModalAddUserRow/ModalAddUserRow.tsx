import styles from "./styles.module.scss";

import { FC, useState } from "react";
import { FormCreateUser } from "..";
import { Button, Modal } from "../../shared";
import { type TValidationData } from "../../shared/columns";
import { type IUserWithoutId } from "../../shared/entityTypes";

interface IModalAddUserRowProps {
  validationData: TValidationData[];
  onSubmit?: (data: IUserWithoutId) => void;
}

export const ModalAddUserRow: FC<IModalAddUserRowProps> = ({
  validationData,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickOpen = () => {
    setIsOpen(true);
  };

  const onClickClose = () => {
    setIsOpen(false);
  };

  const onClickSubmit = (data: IUserWithoutId) => {
    onSubmit?.(data);
    setIsOpen(false);
  };
  return (
    <>
      <Button className={styles.button} onClick={onClickOpen}>
        Добавить запись
      </Button>

      <Modal
        title="Добавить пользователя"
        isOpen={isOpen}
        onClose={onClickClose}
      >
        <FormCreateUser
          validationData={validationData}
          onSubmit={onClickSubmit}
        />
      </Modal>
    </>
  );
};
