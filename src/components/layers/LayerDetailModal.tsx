"use client";

import React from "react";
import { OsiLayer } from "@/types";
import { 
  X, 
  Layers, 
  Cpu, 
  Lightbulb, 
  Globe, 
  ShieldAlert, 
  CheckCircle, 
  FileText,
  Boxes
} from "lucide-react";

interface LayerDetailModalProps {
  layer: OsiLayer | null;
  onClose: () => void;
}

export const LayerDetailModal: React.FC<LayerDetailModalProps> = ({ layer, onClose }) => {
  if (!layer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-slate-700 bg-slate-900 shadow-2xl p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pb-5 border-b border-slate-800">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0"
            style={{ backgroundColor: layer.color }}
          >
            L{layer.number}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${layer.badgeBg} ${layer.badgeText} border ${layer.badgeBorder}`}>
                OSI 계층 {layer.number}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                PDU: {layer.pdu}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              {layer.nameKo} <span className="text-slate-400 font-normal text-sm">({layer.nameEn})</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">{layer.summary}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-5">
          {/* Metaphor Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
              <Lightbulb className="w-4 h-4" />
              <span>초보자를 위한 직관적 비유</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {layer.metaphor}
            </p>
          </div>

          {/* Key Functions */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              핵심 역할 및 주요 기능
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {layer.functions.map((func, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                >
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{func}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Header Structure */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              {layer.headerName} 상세 구조
            </h4>
            <div className="space-y-2">
              {layer.headerFields.map((field, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyan-300">{field.label}</span>
                    <span className="text-[11px] text-slate-400">({field.desc})</span>
                  </div>
                  <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-amber-300 border border-slate-800">
                    예시: {field.example}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Protocols & Hardware */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Protocols */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <h5 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-400" />
                대표 프로토콜
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {layer.protocols.map((proto) => (
                  <span
                    key={proto}
                    className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/25 font-mono"
                  >
                    {proto}
                  </span>
                ))}
              </div>
            </div>

            {/* Hardware */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <h5 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                관련 장비 / 하드웨어
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {layer.hardware.map((hw) => (
                  <span
                    key={hw}
                    className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/25"
                  >
                    {hw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Developer Tip */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-xs text-cyan-200 leading-relaxed">
              {layer.developerTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
