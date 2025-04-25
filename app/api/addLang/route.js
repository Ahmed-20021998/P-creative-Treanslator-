export async function POST(req) {
  const { lang } = await req.json();

  try {
    const response = await fetch('https://add-lang-pcreative-translator.vercel.app/addLanguage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lang }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ message: 'Failed to add language', error: errorData }), { status: 500 });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
  }
}
