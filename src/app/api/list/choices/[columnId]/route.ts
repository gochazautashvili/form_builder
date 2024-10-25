import db from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { NextRequest } from "next/server";

interface Props {
  params: { columnId: string };
}

export async function GET(req: NextRequest, { params: { columnId } }: Props) {
  try {
    const options = await db.option.findMany({
      where: { columnId },
    });

    return Response.json(options);
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}
