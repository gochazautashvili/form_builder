import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Resizer from "react-image-file-resizer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "Something went wrong! try agin.";
  }
};

export const parseJsonData = (jsonData: string) => {
  try {
    const json = JSON.parse(jsonData);

    return json;
  } catch (_) {
    return null;
  }
};

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "webp",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
    );
  });
