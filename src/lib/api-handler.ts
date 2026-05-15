import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import { verifyToken } from "@/lib/auth";

type Item = Record<string, unknown>;

function checkAuth(request: NextRequest): boolean {
  const cookieToken = request.cookies.get("admin_token")?.value;
  const headerToken = request.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookieToken || headerToken;
  return !!token && verifyToken(token);
}

export function createHandlers<T extends Item>(filename: string) {
  return {
    async GET(request: NextRequest) {
      if (!checkAuth(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json(readData<T>(filename));
    },

    async POST(request: NextRequest) {
      if (!checkAuth(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const data = readData<T>(filename);
      const item = await request.json() as Record<string, unknown>;
      if (!item.id) {
        item.id = crypto.randomUUID();
      }
      data.push(item as T);
      writeData(filename, data);
      return NextResponse.json({ success: true, item });
    },

    async PUT(request: NextRequest) {
      if (!checkAuth(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const { id, ...updates } = await request.json();
      const data = readData<T>(filename);
      const index = data.findIndex((d: T) => (d as Record<string, unknown>).id === id);
      if (index === -1) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      data[index] = { ...data[index], ...updates } as T;
      writeData(filename, data);
      return NextResponse.json({ success: true, item: data[index] });
    },

    async DELETE(request: NextRequest) {
      if (!checkAuth(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const { id } = await request.json();
      const data = readData<T>(filename);
      const filtered = data.filter((d: T) => (d as Record<string, unknown>).id !== id);
      if (filtered.length === data.length) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      writeData(filename, filtered);
      return NextResponse.json({ success: true });
    },
  };
}
