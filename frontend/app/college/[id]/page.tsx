"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function CollegeDetail() {
  const [college, setCollege] = useState<any>(null);

  // ✅ Correct way to get id
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchCollege = async () => {
      try {
        const res = await axios.get("http://localhost:5000/colleges");

        const found = res.data.find((c: any) => c.id == id);
        setCollege(found);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCollege();
  }, [id]); // ✅ ONLY id here

  if (!college) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{college.name}</h1>

      <p className="mt-2 text-gray-600">{college.location}</p>
      <p className="mt-2">Fees: ₹{college.fees}</p>
      <p className="mt-2">Rating: ⭐ {college.rating}</p>
      <p className="mt-2">Placement: {college.placement_percentage}%</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>{college.description}</p>
      </div>
    </div>
  );
}