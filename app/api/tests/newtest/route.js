import { newTestTransaction } from "../../../../lib/database";

const { NextResponse } = require("next/server");

export const POST = async (req) => {
    const data = await req.json();
    
    try {

        const queries = [
            {
                query: "INSERT INTO tests (patient_id, doc_id, date, paid) VALUES (?, ?, ?, ?);",
                values: [data.patient_id, data.doc_id, data.date, data.paid],
            },
            {
                query: "INSERT INTO enrollments (tests_id, test) VALUES (?, ?);",
                values: [data.test_nos],
            },
        ];
        await newTestTransaction(queries);
  
        return NextResponse.json({ message: "Doctor updated" }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error occurred while registering new test" }, { status: 501 });
    }
};