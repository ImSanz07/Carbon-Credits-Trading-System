// /app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      <p className="mt-4 text-lg font-medium">Please Wait...</p>
    </div>
  );
}
