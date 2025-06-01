import * as yup from "yup";
import { ColDef } from "ag-grid-community";

import type { IUser, IUserWithoutId } from "../entityTypes";

export type TValidationData = {
  validation?: yup.AnySchema;
  fieldName?: keyof IUserWithoutId;
  formLabel?: string;
};

export type TColumnWithValidation = ColDef<IUser> & TValidationData;
