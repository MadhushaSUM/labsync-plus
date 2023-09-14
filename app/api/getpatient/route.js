import { query } from "../../../lib/database";

const { NextResponse } = require("next/server");

export const GET = async (req, res) => {
    try {
        const patients = await query({
            query:"SELECT * FROM patients",
            values:[]
        });
        
        return NextResponse.json({ patients: patients }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while getting patient names" }, { status: 501 });
    }
}