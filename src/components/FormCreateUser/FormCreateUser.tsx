import styles from "./styles.module.scss";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { type TValidationData } from "../../shared/columns";
import { type IUserWithoutId } from "../../shared/entityTypes/user";

interface IFormCreateUserProps {
  validationData: TValidationData[];
  onSubmit?: (data: IUserWithoutId) => void;
}

const buildSchema = (
  data: TValidationData[]
): yup.ObjectSchema<IUserWithoutId> => {
  const shape: Partial<Record<keyof IUserWithoutId, yup.AnySchema>> = {};
  data.forEach(({ fieldName, validation }) => {
    if (validation && fieldName) {
      shape[fieldName as keyof IUserWithoutId] = validation;
    }
  });
  return yup.object().shape(shape) as yup.ObjectSchema<IUserWithoutId>;
};

export const FormCreateUser: FC<IFormCreateUserProps> = ({
  validationData,
  onSubmit,
}) => {
  const schema = buildSchema(validationData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserWithoutId>({
    resolver: yupResolver(schema),
  });

  const onClickSubmit = (data: IUserWithoutId) => {
    console.log("Отправленные данные:", data);
    onSubmit?.(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onClickSubmit)}>
      {validationData.map(({ fieldName, formLabel, validation }) => {
        if (!fieldName || !validation) return null;

        const fieldError = errors[fieldName as keyof IUserWithoutId];
        const type = validation?._type;

        return (
          <div key={fieldName} className={styles.fieldWrapper}>
            {type === "boolean" ? (
              <label className={styles.checkboxLabel}>
                <input type="checkbox" {...register(fieldName)} /> {formLabel}
              </label>
            ) : (
              <>
                <label className={styles.label}>{formLabel}</label>
                <input
                  className={styles.input}
                  type={type === "number" ? "number" : "text"}
                  {...register(fieldName)}
                />
              </>
            )}
            {fieldError && (
              <span className={styles.error}>{fieldError.message}</span>
            )}
          </div>
        );
      })}

      <button type="submit" className={styles.submitButton}>
        Создать
      </button>
    </form>
  );
};
