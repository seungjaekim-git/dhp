export default function Loading() {
    if (process.env.NODE_ENV === "development") return null; // 개발 모드에서는 로딩 숨김

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-gray-300 rounded-full"></div>
        <p className="mt-4 text-gray-600">페이지를 불러오는 중...</p>
      </div>
    );
  }
  