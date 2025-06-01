import styles from "./styles.module.scss";

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import {
  ColDef,
  GridReadyEvent,
  IDatasource,
  GridApi,
} from "ag-grid-community";
import { Table } from "../../shared";
import { getRows } from "../../shared/api";
import { IUser } from "../../shared/entityTypes";

type IRow = IUser;

interface ITableUsersProps {
  columns: ColDef<IRow>[];
}

export interface TableUsersInfiniteRef {
  refresh: () => void;
}

const dataSource: IDatasource = {
  rowCount: undefined,
  getRows: async ({ startRow, endRow, successCallback, failCallback }) => {
    try {
      const data = await getRows({ start: startRow, end: endRow });
      const lastRow =
        data.length < endRow - startRow ? startRow + data.length : undefined;
      successCallback(data, lastRow);
    } catch (e) {
      console.error("Ошибка загрузки данных:", e);
      failCallback();
    }
  },
};

export const TableUsersInfinite = forwardRef<
  TableUsersInfiniteRef,
  ITableUsersProps
>(({ columns }, ref) => {
  const gridApiRef = useRef<GridApi | null>(null);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    gridApiRef.current = params.api;

    params.api.setGridOption("datasource", dataSource);
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      gridApiRef.current?.refreshInfiniteCache();
    },
  }));

  return (
    <div className={styles.tableWrapper}>
      <Table
        columnDefs={columns}
        onGridReady={onGridReady}
        rowModelType="infinite"
        cacheBlockSize={20}
        maxBlocksInCache={10}
      />
    </div>
  );
});
