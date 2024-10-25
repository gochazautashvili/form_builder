import db from "@/lib/db";
import { getErrorMessage, parseJsonData } from "@/lib/utils";
import { TRowContent } from "@/types";
import { NextRequest } from "next/server";

interface Props {
  params: { listId: string };
}

export async function GET(req: NextRequest, { params: { listId } }: Props) {
  try {
    const pageSize = 10;
    const page = Number(req.nextUrl.searchParams.get("page")) || 0;

    const rows = await db.row.findMany({
      where: { listId },
      take: pageSize,
      skip: page * pageSize,
    });

    const data = rows.map((row) => {
      return {
        rowId: row.id,
        ...(parseJsonData(row.content) as TRowContent),
      };
    });

    return Response.json(data);
  } catch (error) {
    return new Response(getErrorMessage(error), { status: 500 });
  }
}
