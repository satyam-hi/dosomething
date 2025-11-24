
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-white shadow-md px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                {/* LOGO */}
                <Link href="/" className="text-xl font-bold">
                    MySite
                </Link>

                {/* DESKTOP MENU */}
                <nav className="hidden md:flex gap-6 text-lg">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/login" >Login</Link>
                    <Link href="/register" >Register</Link>
                    <Link href="/email-verify" >Email-verify</Link>
                </nav>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden flex flex-col gap-1"
                    onClick={() => setOpen(!open)}
                >
                    <span className="w-6 h-0.5 bg-black"></span>
                    <span className="w-6 h-0.5 bg-black"></span>
                    <span className="w-6 h-0.5 bg-black"></span>
                </button>
            </div>

            {/* MOBILE DROPDOWN */}
            {open && (
                <nav className="md:hidden flex flex-col gap-4 mt-4 px-4 pb-4 text-lg">
                    <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                    <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                    <Link href="/register" onClick={() => setOpen(false)}>Register</Link>
                </nav>
            )}
        </header>
    );
}


