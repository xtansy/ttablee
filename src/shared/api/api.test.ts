import { vi, describe, it, expect, afterEach } from "vitest";
import type { Mock } from "vitest";
import { api } from "./instance";
import { getRows, createRow } from "./requests";
import type { IUser, IUserWithoutId } from "../entityTypes";
import { ApiError } from "./types";

vi.mock("./instance", () => {
  const mockedApi = {
    get: vi.fn(),
    post: vi.fn(),
  };
  return { api: mockedApi };
});

const mockUser: IUser = {
  id: "1",
  username: "testUser",
  email: "test@example.com",
  age: 25,
  isActive: true,
  lastLogin: "2023-01-01",
  premium: false,
  postsCount: 5,
};

describe("API Functions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getRows", () => {
    it("успешно возвращает данные", async () => {
      (api.get as Mock).mockResolvedValueOnce({ data: [mockUser] });

      const result = await getRows({ start: 0, end: 10 });

      expect(api.get).toHaveBeenCalledWith("/users?_start=0&_end=10");
      expect(result).toEqual([mockUser]);
    });

    it("обрабатывает ошибки сервера", async () => {
      const errorResponse = {
        response: {
          status: 500,
          data: { message: "Internal Server Error" },
        },
      };
      (api.get as Mock).mockRejectedValueOnce(errorResponse);

      await expect(getRows({ start: 0, end: 10 })).rejects.toThrow(
        new ApiError("Internal Server Error", 500, errorResponse)
      );
    });

    it("обрабатывает сетевые ошибки", async () => {
      const networkError = new Error("Network Error");
      (api.get as Mock).mockRejectedValueOnce(networkError);

      await expect(getRows({ start: 0, end: 10 })).rejects.toThrow(
        new ApiError("Неизвестная ошибка", undefined, networkError)
      );
    });
  });

  describe("createRow", () => {
    const newUser: IUserWithoutId = {
      username: "newUser",
      email: "new@example.com",
      age: 30,
      isActive: true,
      lastLogin: "2023-02-01",
      premium: true,
      postsCount: 10,
    };

    it("успешно создает запись", async () => {
      (api.post as Mock).mockResolvedValueOnce({ data: mockUser });

      const result = await createRow(newUser);

      expect(api.post).toHaveBeenCalledWith("/users", newUser);
      expect(result).toEqual(mockUser);
    });

    it("обрабатывает ошибки при создании", async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: "Validation Error" },
        },
      };
      (api.post as Mock).mockRejectedValueOnce(errorResponse);

      await expect(createRow(newUser)).rejects.toThrow(
        new ApiError("Validation Error", 400, errorResponse)
      );
    });
  });
});
