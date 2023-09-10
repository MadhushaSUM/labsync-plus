import { query } from "../../../lib/database";

const { NextResponse } = require("next/server");

export const POST = async (req, res) => {
    try {
        const data = await req.json();

        const patients = await query({
            query:`SELECT * FROM patients WHERE name LIKE '%${data.patientname}%'`,
            values:[]
        });

        return NextResponse.json({ patients: patients }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while getting patient names" }, { status: 501 });
    }

}