import { NextResponse } from "next/server";
import { readData } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [services, clients, portfolio, blog, team, newsletter, contacts] = await Promise.all([
      readData("services.json"),
      readData("clients.json"),
      readData("portfolio.json"),
      readData("blog.json"),
      readData("team.json"),
      readData("newsletter.json"),
      readData("contacts.json"),
    ]);

    return NextResponse.json({
      services: services.length ? services : null,
      clients: clients.length ? clients : null,
      portfolio: portfolio.length ? portfolio : null,
      blog: blog.length ? blog : null,
      team: team.length ? team : null,
      newsletter: newsletter.length ? newsletter : null,
      contacts: contacts.length ? contacts : null,
    });
  } catch {
    return NextResponse.json({
      services: null, clients: null, portfolio: null,
      blog: null, team: null, newsletter: null, contacts: null,
    });
  }
}
