import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OSI 7계층 인터랙티브 시각화 & 실습 연구소 | OSI Interactive Lab",
  description: "OSI 7계층과 TCP/IP 4계층의 데이터 캡슐화 및 네트워크 전송 원리를 직접 만지고 실습해보는 웹 시뮬레이터입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen bg-[#0B0F19] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
