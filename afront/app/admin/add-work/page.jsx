"use client";


import { useEffect, useState } from "react";

export default  function AddWorkPage() {

  const [cities, setCities] = useState([]);
  const [localAreas, setLocalAreas] = useState([]);
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    sctyid: "",
    sloctyid: "",
    ssrvcid: "",
    // status: "OPEN",
    // paymentStatus: "UNPAID",
    price: "",
    suid: "",
    sprovid: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
   const [cookies, setCookies] = useState({ token: null, role: null, id: null });


  // GET USER ID FROM COOKIES
  useEffect(() => {
      async function fetchCookies() {
      const res = await fetch("/api/cookies", {
        cache: "no-store",
      });
      const data = await res.json();
      setCookies(data);
      setForm((p) => ({ ...p, suid: data.id }))
    }
    fetchCookies();
  }, []);

  // FETCH CITY, LOCAL AREA, SERVICE FROM NODE JS API
  useEffect(() => {
    fetch("http://localhost:8000/api/city")
      .then((res) => res.json())
      .then((data) => {console.log(data); setCities(data.citys || []) })
      .catch((e) => { console.log(e)});

    fetch("http://localhost:8000/api/local-aria")
      .then((res) => res.json())
      .then((data) => setLocalAreas(data.loaclArias || []))
      .catch((e) => { console.log(e)});

    fetch("http://localhost:8000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data.services || []))
      .catch((e) => { console.log(e)});
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const response = await fetch("http://localhost:8000/api/works/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      setMsg({ type: "success", text: data.message });
    } else {
      setMsg({ type: "error", text: data.message });
    }
  }


  // console.log("cities",cities)
  // console.log("localAreas",localAreas)
  // console.log("services",services)
  // console.log("form",form)
  // console.log("cookies",cookies)


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add Work</h2>

        {msg && (
          <p
            className={`p-2 mb-3 text-center rounded ${msg.type === "success" ? "bg-green-200" : "bg-red-200"
              }`}
          >
            {msg.text}
          </p>
        )}

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          {/* Title */}
          <input
            name="title"
            className="border p-2 rounded"
            placeholder="Work Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            className="border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          {/* City Dropdown */}
          <select
            name="sctyid"
            className="border p-2 rounded"
            value={form.sctyid}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Local Area Dropdown */}
          <select
            name="sloctyid"
            className="border p-2 rounded"
            value={form.sloctyid}
            onChange={handleChange}
            required
          >
            <option value="">Select Local Area</option>
            {localAreas.map((l) => (
              <option key={l._id} value={l._id}>
                {l.name}
              </option>
            ))}
          </select>

          {/* Services Dropdown */}
          <select
            name="ssrvcid"
            className="border p-2 rounded"
            value={form.ssrvcid}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Price */}
          <input
            name="price"
            type="number"
            className="border p-2 rounded"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          {/* Provider ID (optional) */}
          <input
            name="sprovid"
            className="border p-2 rounded"
            placeholder="Provider ID (optional)"
            value={form.sprovid}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Add Work"}
          </button>
        </form>
      </div>
    </div>
  );
}










