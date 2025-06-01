import { TableUsersInfinite, ModalAddUserRow } from "../../components";
import { TableUsersInfiniteRef } from "../../components/TableUsersInfinite/TableUsersInfinite";
import { useRef, useState } from "react";
import {
  COLUMNS_WITH_VALIDATION,
  mapToColDefs,
  mapToValidationData,
} from "../../shared/columns";
import { createRow } from "../../shared/api";
import { type IUserWithoutId } from "../../shared/entityTypes";

const COLUMNS = mapToColDefs(COLUMNS_WITH_VALIDATION);
const VALIDATION_DATA = mapToValidationData(COLUMNS_WITH_VALIDATION);

export const TableUsersManagement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tableRef = useRef<TableUsersInfiniteRef>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onAddUser = (data: IUserWithoutId) => {
    setIsLoading(true);
    createRow(data)
      .then(() => {
        tableRef.current?.refresh();
      })
      .finally(() => {
        setIsLoading(false);
        closeModal();
      });
  };
  return (
    <>
      <TableUsersInfinite ref={tableRef} columns={COLUMNS} />
      <ModalAddUserRow
        openModal={openModal}
        isLoading={isLoading}
        isOpen={isOpen}
        closeModal={closeModal}
        validationData={VALIDATION_DATA}
        onSubmit={onAddUser}
      />
    </>
  );
};
