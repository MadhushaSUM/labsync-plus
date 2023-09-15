import { query } from "../../../lib/database";

const { NextResponse } = require("next/server");

export const PUT = async (req) => {

    const data = await req.json();

    try {

        await query({
            query: "UPDATE doctors SET name = ? WHERE id = ?",
            values:[data.name, data.id]
        });

        return NextResponse.json({ message: "Doctor updated" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while updating doctor" }, { status: 501 });
    }
}