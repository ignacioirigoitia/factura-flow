import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {
    const response = await fetch('https://eik11ikojf.execute-api.us-east-1.amazonaws.com/dev/api/v1/invoices/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': 'ihnP3CtIfX8AwRlVWESyU3CeX7sdahQ6cJLVqdsd',
      },
      body: request.body,
    });

    const data = await response.json();
    return NextResponse.json({
      method: 'POST',
      data: data
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { 
        message: 'Unauthorized',
        error: error
      },
      { 
        status: 401 
      }
    );
  }
}