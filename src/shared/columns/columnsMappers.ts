import { ColDef } from "ag-grid-community";

import { type IUser } from "../entityTypes";
import type { TColumnWithValidation, TValidationData } from "./types";

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
