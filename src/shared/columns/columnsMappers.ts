import { ColDef } from "ag-grid-community";

import {
  type TColumnWithValidation,
  type TValidationData,
} from "./columnsWithValidation";
import { IUser } from "../entityTypes";

export const mapToColDefs = (
  columns: TColumnWithValidation[]
): ColDef<IUser>[] => {
  return columns.map(
    ({ fieldName, validation, formLabel, ...colDef }) => colDef
  );
};

export const mapToValidationData = (
  columns: TColumnWithValidation[]
): TValidationData[] => {
  return columns
    .filter(
      ({ validation, formLabel, fieldName }) =>
        validation && formLabel && fieldName
    )
    .map(({ validation, formLabel, fieldName }) => ({
      fieldName,
      validation,
      formLabel,
    }));
};
