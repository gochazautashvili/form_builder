import { getOrganization } from "@/data/getOrganization";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  list_background: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const org = await getOrganization();

      if (!org) throw new UploadThingError("Unauthorized");

      return { userId: org.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { image: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
