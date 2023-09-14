import { query } from "../../../../lib/database";

const { NextResponse } = require("next/server");

export const POST = async (req, res) => {
    try {
        const data = await req.json();
    
        await query({
            query:"INSERT INTO patients (name) VALUES (?)",
            values:[data.name]
        });

        return NextResponse.json({ message:"Patient added" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while adding patient" }, { status: 501 });
    }
}