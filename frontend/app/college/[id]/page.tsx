"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function CollegeDetail() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [college, setCollege] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCollege = async () => {
      try {
        const res = await axios.get(
          "https://college-platform-i3hs.onrender.com/colleges"
        );

        const found = res.data.find(
          (c: any) => String(c.id) === String(id)
        );

        setCollege(found || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCollege();
  }, [id]);

  if (!college) return <p className="p-6">Loading...</p>;

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