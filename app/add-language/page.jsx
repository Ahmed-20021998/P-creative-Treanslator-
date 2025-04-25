"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";   // ← استيراد


export default function AddLang() {
    const [lang, setLang] = useState("");
    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/addLang', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lang }),
            });

            // Check if the response is not OK (status code is not in the range 200-299)
            if (!response.ok) {
                const errorText = await response.text(); // Get the raw error message
                console.error('Error response:', errorText);
                throw new Error('Failed to add language'); // Manually throw an error if the response is not OK
            }

            const data = await response.json(); // Only parse as JSON if the response is valid JSON
            console.log('Language added:', data);
            alert('Language added successfully!');
            router.push("/");  
        } catch (error) {
            console.error('Error occurred:', error);
            alert(`Error occurred while adding language: ${error.message}`);
        }
    };


    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-slate-100 to-white">
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 ring-1 ring-black/5">
                <h1 className="text-3xl font-semibold text-center mb-8 tracking-tight">Add new language</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="lang" className="text-sm font-medium text-gray-700">
                            Language / Accent name
                        </label>
                        <input
                            id="lang"
                            type="text"
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            placeholder="e.g. Egyptian Arabic accent"
                            className="rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-lg font-medium bg-black text-white hover:bg-gray-900 transition-all"
                    >
                        Save language
                    </button>
                </form>
            </div>
        </main>
    );
}
