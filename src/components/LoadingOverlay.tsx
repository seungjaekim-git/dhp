export default function LoadingOverlay() {
  if (process.env.NODE_ENV === "development") return null; // 개발 모드에서는 로딩 숨김

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin h-16 w-16 border-4 border-t-4 border-white rounded-full"></div>
    </div>
  );
}
