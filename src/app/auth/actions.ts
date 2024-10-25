"use server";
import db from "@/lib/db";
import {
  sign_in_schema,
  sign_up_schema,
  TSign_in,
  TSign_up,
} from "./validation";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getErrorMessage } from "@/lib/utils";

export const sign_up = async (value: TSign_up) => {
  try {
    const { data, error } = sign_up_schema.safeParse(value);

    if (error) {
      return { error: error.message };
    }

    const existingOrg = await db.organization.findUnique({
      where: { email: data.email },
    });

    if (existingOrg) {
      return { error: "Organization already exist!" };
    }

    const hash_password = await bcrypt.hash(data.password, 10);

    const { password, ...valid } = data;

    const org = await db.organization.create({
      data: { ...valid, hash_password },
    });

    cookies().set("organization_session", org.id, {
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 1,
      sameSite: "strict",
      httpOnly: true,
      path: "/",
    });

    return {
      success: true,
      message: "Organization successfully created",
      url: "/",
    };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const sign_in = async (value: TSign_in) => {
  try {
    const { data, error } = sign_in_schema.safeParse(value);

    if (error) {
      return { error: error.message };
    }

    const existingOrg = await db.organization.findUnique({
      where: { email: data.email },
    });

    if (!existingOrg) {
      return { error: "Organization not found!" };
    }

    const compare_password = await bcrypt.compare(
      data.password,
      existingOrg.hash_password,
    );

    if (!compare_password) {
      return { error: "Organization not found!" };
    }

    cookies().set("organization_session", existingOrg.id, {
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 1,
      sameSite: "strict",
      httpOnly: true,
      path: "/",
    });

    return {
      success: true,
      message: "Organization successfully find",
      url: "/",
    };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
