"use client";

import { useEffect, useState } from "react";

export default function ProviderDashboard() {
    const [provider, setProvider] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const providerId = typeof window !== "undefined" ? localStorage.getItem("providerId") : null;
    const API_BASE = "http://localhost:8000"; // <-- Your Node.js API

    // ============================
    // FETCH PROVIDER DETAILS
    // ============================
    const fetchProvider = async () => {
        if (!providerId) return setError("Provider ID not found");
        try {
            const res = await fetch(`${API_BASE}/provider/provider/${providerId}`);
            if (!res.ok) throw new Error("Failed to fetch provider");
            const data = await res.json();
            setProvider(data.provider);
        } catch (err) {
            setError(err.message);
        }
    };

    // ============================
    // FETCH USERS
    // ============================
    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_BASE}/users`);
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data.users);
        } catch (err) {
            setError(err.message);
        }
    };

    // ============================
    // LOGOUT
    // ============================
    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE}/provider/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sprovid: providerId }),
            });
            localStorage.removeItem("providerId");
            window.location.href = "/provider/login";
        } catch {
            alert("Logout failed");
        }
    };

    // ============================
    // INITIAL LOAD
    // ============================
    useEffect(() => {
        async function load() {
            await fetchProvider();
            await fetchUsers();
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return <h2 style={{ textAlign: "center", marginTop: 40 }}>Loading...</h2>;
    if (error) return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Provider Dashboard</h1>
                <button style={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Provider Info */}
            <div style={styles.card}>
                <h2>Welcome, {provider?.name}</h2>
                <p><strong>Email:</strong> {provider?.email}</p>
                <p><strong>ID:</strong> {provider?.sprovid}</p>
            </div>

            {/* Users Table */}
            <div style={styles.card}>
                <h2>User Details</h2>
                {users?.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>SUID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Verified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.suid}>
                                    <td>{u.suid}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.emailVerify ? "✔️" : "❌"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: { width: "90%", maxWidth: "1200px", margin: "40px auto", fontFamily: "Arial" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    logoutBtn: { padding: "8px 16px", background: "red", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" },
    card: { background: "#fff", padding: 20, marginTop: 20, borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
    table: { width: "100%", borderCollapse: "collapse" },
};
