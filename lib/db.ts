import { PrismaClient } from "@prisma/client";

/*
 * Store PrismaClient as a global variable in development
 * environments only, as global variables are not reloaded
 */

declare global {
  var prisma: PrismaClient | undefined;
}

// to mitigate HMR from intializing a bunch of clients after every code edit
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
