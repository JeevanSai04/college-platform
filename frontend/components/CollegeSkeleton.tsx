export default function CollegeSkeleton() {
  return (
    <div className="border rounded-xl p-4 shadow animate-pulse">
      
      {/* checkbox placeholder */}
      <div className="w-4 h-4 bg-gray-300 mb-3 rounded"></div>

      {/* title */}
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>

      {/* location */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>

      {/* fees */}
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>

      {/* rating */}
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>

      {/* placement */}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>

    </div>
  );
}