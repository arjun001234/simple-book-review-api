import { PrismaClient } from "@prisma/client";
import { db } from "../db/db";

export interface Context {
    db: PrismaClient
}

export const context : Context = {
    db
}