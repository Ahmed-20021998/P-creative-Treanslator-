'use client';

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Translate() {
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("");
    const [result, setResult] = useState("");
    const [langs, setLangs] = useState([]);        // ⬅ fetched languages
    const [loadingLangs, setLoadingLangs] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/fetchLang", { cache: "no-store" });
                const data = await res.json();            // expects { Languages: [...] }
                setLangs(data?.Languages ?? []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingLangs(false);
            }
        })();
    }, []);

    const handleTranslate = async () => {
        const res = await fetch("/api/linkAi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, language })
        });

        const data = await res.json();
        setResult(data.translated || data.error);
    };

    return (
        <div className="min-h-screen px-4 py-12 flex flex-col items-center gap-10">
            <div className="w-[95%] sm:w-[80%] shadow-xl border border-gray-200 rounded-2xl p-6 space-y-4">
                <textarea
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full text-base p-4 rounded-xl min-h-[120px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex items-center gap-2">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="p-4 rounded-xl border border-gray-300 w-[80%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            {loadingLangs ? "Loading languages..." : "Select output language"}
                        </option>

                        {langs.map((lng) => (
                            <option key={lng} value={lng}>
                                {lng}
                            </option>
                        ))}
                    </select>

                    <Link
                        href="/add-language"
                        className="p-3 rounded-xl border border-gray-300 flex items-center gap-2 hover:bg-gray-100"
                    >
                        <Plus className="h-5 w-5" />
                        <span className="text-sm font-medium">Add Language</span>
                    </Link>
                </div>

                <button
                    onClick={handleTranslate}
                    className="w-full bg-black text-white p-4 text-lg rounded-xl hover:bg-gray-900"
                >
                    Translate
                </button>
            </div>

            {result && (
                <div className="w-full max-w-xl shadow-md border border-gray-200 rounded-2xl p-6">
                    <p className="text-lg text-gray-800 whitespace-pre-wrap">{result}</p>
                </div>
            )}
        </div>
    );
}
