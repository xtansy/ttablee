import * as yup from "yup";
import { ColDef } from "ag-grid-community";

import { type IUser, type IUserWithoutId } from "../entityTypes";

export type TValidationData = {
  validation?: yup.AnySchema;
  fieldName?: keyof IUserWithoutId;
  formLabel?: string;
};

export type TColumnWithValidation = ColDef<IUser> & TValidationData;

export const COLUMNS_WITH_VALIDATION: TColumnWithValidation[] = [
  {
    field: "id",
    headerName: "ID",
    maxWidth: 100,
    minWidth: 50,
  },
  {
    field: "username",
    fieldName: "username",
    headerName: "Имя пользователя",
    formLabel: "Имя пользователя",
    minWidth: 120,
    validation: yup.string().required("Обязательное поле"),
  },
  {
    field: "email",
    fieldName: "email",
    headerName: "Электронная почта",
    formLabel: "Email",
    validation: yup
      .string()
      .email("Некорректный email")
      .required("Обязательное поле"),
  },
  {
    field: "age",
    fieldName: "age",
    headerName: "Возраст",
    formLabel: "Возраст",
    maxWidth: 100,
    validation: yup.number().required("Введите возраст").min(0).max(120),
  },
  {
    field: "isActive",
    fieldName: "isActive",
    headerName: "Активен",
    formLabel: "Активен",
    maxWidth: 100,
    validation: yup.boolean().required(),
  },
  {
    field: "lastLogin",
    fieldName: "lastLogin",
    headerName: "Последний вход",
    formLabel: "Последний вход",
    validation: yup.string(),
  },
  {
    field: "premium",
    fieldName: "premium",
    headerName: "Премиум-статус",
    formLabel: "Премиум",
    maxWidth: 150,
    validation: yup.boolean().required(),
  },
  {
    field: "postsCount",
    fieldName: "postsCount",
    headerName: "Посты",
    formLabel: "Количество постов",
    maxWidth: 170,
    validation: yup.number().required().min(0),
  },
];
