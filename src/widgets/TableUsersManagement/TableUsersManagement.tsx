import { TableUsersInfinite, ModalAddUserRow } from "../../components";
import { TableUsersInfiniteRef } from "../../components/TableUsersInfinite/TableUsersInfinite";
import { useRef } from "react";
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
  const tableRef = useRef<TableUsersInfiniteRef>(null);

  const onAddUser = (data: IUserWithoutId) => {
    createRow(data).then(() => {
      tableRef.current?.refresh();

      console.log("@@ tableRef.current", tableRef.current);
    });
  };
  return (
    <>
      <TableUsersInfinite ref={tableRef} columns={COLUMNS} />
      <ModalAddUserRow validationData={VALIDATION_DATA} onSubmit={onAddUser} />
    </>
  );
};
