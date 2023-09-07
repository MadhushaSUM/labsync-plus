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

        if (user.length !== 0) {
            return NextResponse.json({ message: "Username already registered!" }, { status: 502 });                        
        }

        // add new user
        await query({
            query:"INSERT INTO users (username, email, password) VALUES (?,?,?)",
            values: [data.username, data.email, data.password],
            
        });

        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while registering the user" }, { status: 501 });        
    }
}