import { pool } from "@/db/dbConfig";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Define the schema for the table you want to create

    const { tableName, schema } = await request.json();

    // Construct the SQL query to create the table

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            ${schema
              .map((field) =>
                field.primaryKey
                  ? `${field.name} ${field.type} PRIMARY KEY`
                  : `${field.name} ${field.type}`
              )
              .join(", ")}
        )
        `.replace(/\s+/g, " ");

    // Get a client from the pool
    const client = await pool.connect();

    // Execute the SQL query to create the table
    await client.query(createTableQuery);

    console.log("Create Table Query ----> ", createTableQuery);
    // console.log("Pool Client is this ----> ", client);

    // Release the client back to the pool
    client.release();

    return NextResponse.json({
      message: "Table created successfully",
      createTableQuery: createTableQuery,
    });
  } catch (error) {
    console.error("Error creating table:", error);
    return NextResponse.json({ error: "Table creation failed" });
  }
}
