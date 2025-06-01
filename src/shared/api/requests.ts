import { AxiosError } from "axios";

import { api } from "./instance";
import { ApiError, type IGetRowsParams } from "./types";
import { type IUser, type IUserWithoutId } from "../entityTypes";

export const getRows = async ({
  start,
  end,
}: IGetRowsParams): Promise<IUser[]> => {
  try {
    const { data } = await api.get<IUser[]>(
      `/users?_start=${start}&_end=${end}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const userMessage =
        error.response?.data?.message || "Произошла ошибка при загрузке данных";

      throw new ApiError(userMessage, error.response?.status, error);
    } else {
      throw new ApiError("Неизвестная ошибка", undefined, error);
    }
  }
};

export const createRow = async (params: IUserWithoutId) => {
  try {
    const { data } = await api.post("/users", params);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const userMessage =
        error.response?.data?.message ||
        "Произошла ошибка при создании пользователя";

      throw new ApiError(userMessage, error.response?.status, error);
    } else {
      throw new ApiError("Неизвестная ошибка", undefined, error);
    }
  }
};
