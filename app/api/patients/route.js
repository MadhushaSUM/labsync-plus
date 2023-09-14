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

export const PUT = async (req, res) => {
    try {
        const data = await req.json();
    
        await query({
            query:"UPDATE patients SET name = ? WHERE id = ?",
            values:[data.name, data.id]
        });

        return NextResponse.json({ message:"Patient details updated" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while updating patient details" }, { status: 501 });
    }
}

export const DELETE = async (req, res) => {
    try {
        const data = await req.json();
    
        await query({
            query:"DELETE FROM patients WHERE id = ?",
            values:[data.id]
        });

        return NextResponse.json({ message:"Patient deleted" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while deleting patient" }, { status: 501 });
    }
}