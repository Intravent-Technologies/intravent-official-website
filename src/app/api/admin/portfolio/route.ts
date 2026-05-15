import { NextRequest } from "next/server";
import { createHandlers } from "@/lib/api-handler";

const handlers = createHandlers("portfolio.json");

export const GET = (req: NextRequest) => handlers.GET(req);
export const POST = (req: NextRequest) => handlers.POST(req);
export const PUT = (req: NextRequest) => handlers.PUT(req);
export const DELETE = (req: NextRequest) => handlers.DELETE(req);
