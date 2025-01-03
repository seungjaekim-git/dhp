"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// 로딩 상태 타입 정의
interface LoadingContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// 초기값 설정
const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

// Provider 컴포넌트
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// 로딩 상태를 사용하는 커스텀 훅
export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
