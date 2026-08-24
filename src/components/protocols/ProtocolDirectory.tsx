"use client";

import React, { useState } from "react";
import { PROTOCOLS_LIST } from "@/domains/protocols/protocolsData";
import { Protocol } from "@/types";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Globe, 
  Hash, 
  ShieldCheck, 
  Tag, 
  Sparkles,
  ExternalLink,
  Layers
} from "lucide-react";

export const ProtocolDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLayerFilter, setSelectedLayerFilter] = useState<number | "ALL">("ALL");
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

  const filteredProtocols = PROTOCOLS_LIST.filter((proto) => {
    const matchesSearch =
      proto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proto.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proto.defaultPort && proto.defaultPort.includes(searchQuery)) ||
      proto.descriptionKo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLayer =
      selectedLayerFilter === "ALL" || proto.layer === selectedLayerFilter;

    return matchesSearch && matchesLayer;
  });

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                네트워크 핵심 프로토콜 백과사전
              </h2>
              <p className="text-xs text-slate-400">
                웹 개발 및 네트워크 실무에서 가장 자주 쓰이는 프로토콜의 동작 원리와 기본 포트를 확인하세요.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="프로토콜 이름, 포트(80, 443)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Layer Filter Badges */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 overflow-x-auto scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            계층 필터:
          </span>
          <button
            onClick={() => setSelectedLayerFilter("ALL")}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
              selectedLayerFilter === "ALL"
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            전체 보기
          </button>
          {[7, 6, 4, 3, 2].map((layerNum) => (
            <button
              key={layerNum}
              onClick={() => setSelectedLayerFilter(layerNum)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedLayerFilter === layerNum
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              L{layerNum} 계층
            </button>
          ))}
        </div>
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProtocols.map((proto) => (
          <div
            key={proto.id}
            onClick={() => setSelectedProtocol(proto)}
            className="glass-panel rounded-xl p-5 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Card Top */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-white group-hover:text-cyan-300">
                    {proto.name}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                    OSI L{proto.layer}
                  </span>
                </div>

                {proto.defaultPort && (
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Port {proto.defaultPort}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 font-medium mb-3 truncate">
                {proto.fullName}
              </p>

              <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                {proto.descriptionKo}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">전송: <strong className="text-slate-200">{proto.transport || "N/A"}</strong></span>
              <span className="text-cyan-400 group-hover:underline flex items-center gap-1 font-semibold">
                자세히 보기 ➔
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Protocol Detail Drawer / Modal */}
      {selectedProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-slate-700 bg-slate-900 shadow-2xl p-6">
            <button
              onClick={() => setSelectedProtocol(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {/* Modal Top */}
            <div className="pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  OSI {selectedProtocol.layer}계층 프로토콜
                </span>
                {selectedProtocol.defaultPort && (
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/30">
                    기본 포트: {selectedProtocol.defaultPort}
                  </span>
                )}
                {selectedProtocol.rfc && (
                  <span className="text-[11px] font-mono text-slate-400">
                    {selectedProtocol.rfc}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-white">
                {selectedProtocol.name}
              </h3>
              <p className="text-xs text-slate-400">{selectedProtocol.fullName}</p>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  📝 프로토콜 개요
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {selectedProtocol.descriptionKo}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  핵심 특징 & 동작 방식
                </h4>
                <ul className="space-y-1.5">
                  {selectedProtocol.keyPoints.map((pt, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2"
                    >
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  주요 활용처 (Use Cases)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProtocol.useCases.map((uc, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Importance for Developers */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                <span className="text-xs font-bold text-cyan-300 block mb-1">
                  💡 웹 개발자에게 왜 중요한가요?
                </span>
                <p className="text-xs text-cyan-100 leading-relaxed">
                  {selectedProtocol.importanceKo}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
