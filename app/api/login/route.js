import { query } from "../../../lib/database";

const { NextResponse } = require("next/server");

export const POST = async (req, res) => {
    try {
        const data = await req.json();

        // check if the username exists
        const user = await query({
            query:"SELECT * FROM users WHERE email = ?",
            values:[data.email]
        });

        if (user.length === 0) {
            return NextResponse.json({ message: "User doesn't exists!" }, { status: 404 });                        
        }

        if (user[0].password !== data.password) {
            return NextResponse.json({ message: "Invalid credentials!" }, { status: 502 });
        }

        return NextResponse.json({ message: "Successfully logged in!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while logging in" }, { status: 501 });
    }
}