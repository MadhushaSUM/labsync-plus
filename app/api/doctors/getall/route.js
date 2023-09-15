import { query } from "../../../../lib/database";

const { NextResponse } = require("next/server");

export const GET = async () => {
    try {

        const doctors = await query({
            query: "SELECT * FROM doctors",
            values:[]
        });

        return NextResponse.json({ doctors: doctors }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while getting doctors" }, { status: 501 });
    }
}