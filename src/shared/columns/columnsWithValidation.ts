import * as yup from "yup";
import { type TColumnWithValidation } from "./types";

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
    validation: yup
      .number()
      .typeError("Введите число")
      .required("Введите возраст")
      .min(0, "Минимум 0 лет")
      .max(120, "Максимум 120 лет"),
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
    validation: yup
      .number()
      .typeError("Введите число")
      .required()
      .min(0)
      .max(1000, "Максимально 1000 постов"),
  },
];
