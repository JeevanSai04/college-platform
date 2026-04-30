"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { API } from "@/lib/api";
import CollegeSkeleton from "@/components/CollegeSkeleton";

export default function Home() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // ✅ ADDED
  const [error, setError] = useState(""); // ✅ ADDED

  useEffect(() => {
    axios
      .get(`${API}/colleges`)
      .then((res) => {
        setColleges(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load colleges");
        setLoading(false);
      });
  }, []);

  const filteredColleges = colleges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    c.location.toLowerCase().includes(location.toLowerCase())
  );

  const handleSelect = (college: any, checked: boolean) => {
    if (checked) {
      setSelected([...selected, college]);
    } else {
      setSelected(selected.filter((c) => c.id !== college.id));
    }
  };

  // ✅ LOADING STATE
 if (loading) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">College List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CollegeSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

  // ❌ ERROR STATE
  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">College List</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search college..."
        className="border p-2 mr-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📍 Filter */}
      <input
        type="text"
        placeholder="Filter by location..."
        className="border p-2"
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* ⚖️ Compare Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        onClick={() => console.log(selected)}
      >
        Compare
      </button>

      {/* 🏫 College Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredColleges.map((c) => (
          <div key={c.id} className="border rounded-xl p-4 shadow">

            <input
              type="checkbox"
              className="mb-2"
              onChange={(e) => handleSelect(c, e.target.checked)}
            />

            <Link href={`/college/${c.id}`}>
              <div className="cursor-pointer">
                <h2 className="text-xl font-semibold">{c.name}</h2>
                <p className="text-gray-600">{c.location}</p>
                <p>Fees: ₹{c.fees}</p>
                <p>Rating: ⭐ {c.rating}</p>
                <p>Placement: {c.placement_percentage}%</p>
              </div>
            </Link>

          </div>
        ))}
      </div>

      {/* ⚖️ Comparison Table */}
      {selected.length > 1 && (
        <div className="mt-8 border p-4">
          <h2 className="text-xl font-bold mb-4">Comparison</h2>

          <table className="table-auto border w-full text-center">
            <thead>
              <tr>
                <th className="border p-2">Feature</th>
                {selected.map((c) => (
                  <th key={c.id} className="border p-2">{c.name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-2">Fees</td>
                {selected.map((c) => (
                  <td key={c.id} className="border p-2">₹{c.fees}</td>
                ))}
              </tr>

              <tr>
                <td className="border p-2">Rating</td>
                {selected.map((c) => (
                  <td key={c.id} className="border p-2">{c.rating}</td>
                ))}
              </tr>

              <tr>
                <td className="border p-2">Placement</td>
                {selected.map((c) => (
                  <td key={c.id} className="border p-2">
                    {c.placement_percentage}%
                  </td>
                ))}
              </tr>

              <tr>
                <td className="border p-2">Location</td>
                {selected.map((c) => (
                  <td key={c.id} className="border p-2">{c.location}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}