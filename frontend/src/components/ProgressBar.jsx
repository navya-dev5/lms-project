export default function ProgressBar({ value = 0, className = '', label = null }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`w-full ${className}`.trim()}>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full shadow-md transition-all duration-300 ease-in-out"
          style={{width: `${clamped}%`}}
        />
      </div>
      {label && (
        <p className="mt-2 text-right text-sm text-gray-600 font-medium">
          {label} ({Math.round(clamped)}%)
        </p>
      )}
    </div>
  );
}
