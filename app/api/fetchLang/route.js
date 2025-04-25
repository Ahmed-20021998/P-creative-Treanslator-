// app/api/fetchLang/route.js

export async function GET() {
  try {
    const response = await fetch('https://add-lang-pcreative-translator.vercel.app/getLanguages');

    if (!response.ok) {
      throw new Error('Failed to fetch languages');
    }

    const languages = await response.json();

    return new Response(
      JSON.stringify({ Languages: languages }), // 🔥 Wrap the list
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
