"use client";

import React, { useState, useEffect } from "react";
import { 
  Network, 
  Layers, 
  Send, 
  Cpu, 
  BookOpen, 
  HelpCircle, 
  Sparkles,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

export type NavTab = "simulator" | "builder" | "layers" | "protocols" | "quiz";

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const NETWORK_TIPS = [
  "💡 택배 비유: 편지 내용(L7) ➔ 비밀암호(L6) ➔ 동기화(L5) ➔ 상자포장+방번호(L4) ➔ 도로명주소(L3) ➔ 동호수(L2) ➔ 전기신호(L1)",
  "💡 포트(Port) 번호는 '어떤 프로그램에 줄 것인가', IP 주소는 '어느 컴퓨터로 갈 것인가'를 나타냅니다.",
  "💡 Ping 명령어가 작동하는 것은 3계층(ICMP)까지 정상 작동함을 의미합니다.",
  "💡 HTTPS는 443번 포트를 사용하며, 전송 계층 위에서 TLS 암호화를 적용합니다.",
  "💡 LAN 내부 통신에서는 IP 주소보다 2계층의 MAC 주소가 실질적인 전송 기준이 됩니다.",
  "💡 TCP는 신뢰성을 위해 3-Way Handshake를 거치고, UDP는 지연을 줄이기 위해 바로 쏩니다.",
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % NETWORK_TIPS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: "simulator", label: "패킷 시뮬레이터", icon: <Send className="w-4 h-4" /> },
    { id: "builder", label: "패킷 빌더 실습실", icon: <Cpu className="w-4 h-4" /> },
    { id: "layers", label: "OSI 7 vs TCP/IP 비교", icon: <Layers className="w-4 h-4" /> },
    { id: "protocols", label: "프로토콜 백과", icon: <BookOpen className="w-4 h-4" /> },
    { id: "quiz", label: "퀴즈 & 챌린지", icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur-md">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Network className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">
                OSI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Interactive Lab</span>
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                v1.0 Pro
              </span>
            </div>
            <p className="text-xs text-slate-400">
              네트워크 데이터 캡슐화 & 계층별 패킷 흐름 시각화 실습 플랫폼
            </p>
          </div>
        </div>

        {/* Quick Tips Ticker */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 max-w-xl">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate flex-1 font-medium">{NETWORK_TIPS[tipIndex]}</span>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setTipIndex((prev) => (prev - 1 + NETWORK_TIPS.length) % NETWORK_TIPS.length)}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
              title="이전 팁"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTipIndex((prev) => (prev + 1) % NETWORK_TIPS.length)}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
              title="다음 팁"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
