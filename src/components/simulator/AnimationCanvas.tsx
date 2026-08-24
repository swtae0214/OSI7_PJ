"use client";

import React from "react";
import { OSI_LAYERS } from "@/domains/osi/layersData";
import { SimulationStep, LayerNumber } from "@/types";
import { Laptop, Server, Zap, ArrowDown, ArrowUp, Send, CheckCircle2 } from "lucide-react";

interface AnimationCanvasProps {
  currentStep: SimulationStep;
  onLayerClick?: (layerNumber: LayerNumber) => void;
}

export const AnimationCanvas: React.FC<AnimationCanvasProps> = ({
  currentStep,
  onLayerClick,
}) => {
  const { actor, layerNumber, stage } = currentStep;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Main Dual Device & Stacks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center relative z-10">
        
        {/* SENDER STACK (Col 1 ~ 4) */}
        <div className={`lg:col-span-5 flex flex-col rounded-2xl p-4 transition-all duration-300 ${
          actor === "sender" 
            ? "bg-slate-900/90 border-2 border-cyan-500/60 shadow-xl shadow-cyan-500/10" 
            : "bg-slate-950/60 border border-slate-800/80"
        }`}>
          {/* Sender Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  송신 기기 (Sender Client)
                  {actor === "sender" && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </h4>
                <p className="text-[11px] text-slate-400">IP: 192.168.1.15 | Port: 54321</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>캡슐화 진행 (L7 ➔ L1)</span>
            </div>
          </div>

          {/* 7-Layer Vertical Stack for Sender */}
          <div className="flex flex-col gap-1.5">
            {OSI_LAYERS.map((layer) => {
              const isLayerActive = actor === "sender" && layer.number === layerNumber;
              const isPastLayer = actor === "sender" && layer.number > layerNumber;
              const isAllEncapped = actor === "cable" || actor === "receiver";

              return (
                <button
                  key={`sender-l-${layer.number}`}
                  onClick={() => onLayerClick && onLayerClick(layer.number)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                    isLayerActive
                      ? "scale-[1.02] shadow-lg border-2"
                      : isPastLayer || isAllEncapped
                      ? "opacity-90 border-slate-800 bg-slate-900/60"
                      : "opacity-60 border-slate-800/60 bg-slate-950/40 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: isLayerActive ? layer.color : undefined,
                    backgroundColor: isLayerActive ? `${layer.color}20` : undefined,
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.number}
                    </span>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                          {layer.nameKo}
                        </span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">
                          ({layer.nameEn})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        PDU: {layer.pdu}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isLayerActive && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 animate-pulse flex items-center gap-1">
                        <Send className="w-2.5 h-2.5" />
                        헤더 추가 중
                      </span>
                    )}
                    {(isPastLayer || isAllEncapped) && !isLayerActive && (
                      <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        포장됨 ✓
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CABLE / PHYSICAL TRANSIT (Col 5 ~ 7, Middle) */}
        <div className="lg:col-span-1 flex lg:flex-col items-center justify-center py-4 lg:py-0 gap-3">
          <div className="hidden lg:flex flex-col items-center gap-2">
            <div className={`p-3 rounded-full transition-all duration-300 ${
              actor === "cable"
                ? "bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/50 scale-125 animate-bounce"
                : "bg-slate-800 text-slate-400"
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div className="h-44 w-1.5 rounded-full bg-slate-800 relative overflow-hidden">
              {actor === "cable" && (
                <div className="absolute inset-0 bg-gradient-to-b from-amber-400 via-cyan-400 to-emerald-400 animate-pulse" />
              )}
            </div>
            <span className="text-[10px] font-bold text-slate-400 text-center leading-tight">
              물리 전송선로
              <br />
              (PHY Medium)
            </span>
          </div>

          {/* Mobile horizontal cable indicator */}
          <div className="flex lg:hidden items-center justify-center gap-3 w-full py-2 bg-slate-900/80 rounded-xl border border-slate-800">
            <Zap className={`w-4 h-4 ${actor === "cable" ? "text-amber-400 animate-spin" : "text-slate-500"}`} />
            <span className="text-xs font-semibold text-slate-300">
              {actor === "cable" ? "⚡ 신호 전송선로 통과 중 (010101...)" : "광케이블 / 이더넷 랜선"}
            </span>
          </div>
        </div>

        {/* RECEIVER STACK (Col 7 ~ 11) */}
        <div className={`lg:col-span-5 flex flex-col rounded-2xl p-4 transition-all duration-300 ${
          actor === "receiver" || stage === "COMPLETED"
            ? "bg-slate-900/90 border-2 border-emerald-500/60 shadow-xl shadow-emerald-500/10" 
            : "bg-slate-950/60 border border-slate-800/80"
        }`}>
          {/* Receiver Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  수신 서버 (Receiver Server)
                  {(actor === "receiver" || stage === "COMPLETED") && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </h4>
                <p className="text-[11px] text-slate-400">IP: 93.184.216.34 | Port: 80/443</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>역캡슐화 진행 (L1 ➔ L7)</span>
            </div>
          </div>

          {/* 7-Layer Vertical Stack for Receiver */}
          <div className="flex flex-col gap-1.5">
            {OSI_LAYERS.map((layer) => {
              const isLayerActive = actor === "receiver" && layer.number === layerNumber;
              const isCompleted = stage === "COMPLETED" || (actor === "receiver" && layer.number < layerNumber);

              return (
                <button
                  key={`receiver-l-${layer.number}`}
                  onClick={() => onLayerClick && onLayerClick(layer.number)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                    isLayerActive
                      ? "scale-[1.02] shadow-lg border-2"
                      : isCompleted
                      ? "border-emerald-500/30 bg-emerald-950/20 opacity-90"
                      : "opacity-60 border-slate-800/60 bg-slate-950/40 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: isLayerActive ? layer.color : undefined,
                    backgroundColor: isLayerActive ? `${layer.color}20` : undefined,
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.number}
                    </span>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                          {layer.nameKo}
                        </span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">
                          ({layer.nameEn})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        PDU: {layer.pdu}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isLayerActive && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 animate-pulse">
                        헤더 해제 및 검증 중
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        처리 완료
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
