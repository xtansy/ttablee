import { FC } from "react";

import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const neonTheme = themeQuartz.withParams({
  backgroundColor: "var(--body-bg)",
  foregroundColor: "var(--white-color)",
  headerTextColor: "var(--primary-color)",
  headerBackgroundColor: "#141438", // немного светлее --card-bg-color
  oddRowBackgroundColor: "var(--card-bg-color)",
  headerColumnResizeHandleColor: "var(--primary-color)",
});

export const Table: FC<AgGridReactProps> = ({ ...props }) => {
  return <AgGridReact suppressCellFocus={true} theme={neonTheme} {...props} />;
};
