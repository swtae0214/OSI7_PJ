"use client";

import React, { useState } from "react";
import { OSI_LAYERS, TCPIP_LAYERS } from "@/domains/osi/layersData";
import { OsiLayer } from "@/types";
import { LayerDetailModal } from "./LayerDetailModal";
import { 
  Layers, 
  ArrowRightLeft, 
  HelpCircle, 
  Check, 
  ExternalLink,
  Table as TableIcon
} from "lucide-react";

export const LayerComparison: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<OsiLayer | null>(null);
  const [highlightedOsiLayers, setHighlightedOsiLayers] = useState<number[]>([]);

  return (
    <div className="space-y-6">
      {/* Header Description */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              OSI 7계층 vs TCP/IP 4계층 상호 비교
            </h2>
            <p className="text-xs text-slate-400">
              학술적 표준 모델(OSI 7계층)과 실제 인터넷에서 사용되는 실용 모델(TCP/IP 4계층)의 매핑 관계를 확인하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Side by Side Layer Stacks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OSI 7-Layer Stack */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              OSI 7계층 모델 (참조 표준)
            </h3>
            <span className="text-[11px] text-slate-400">각 계층을 클릭하면 상세 설명이 열립니다</span>
          </div>

          <div className="flex flex-col gap-2">
            {OSI_LAYERS.map((layer) => {
              const isHighlighted = highlightedOsiLayers.includes(layer.number);

              return (
                <button
                  key={`osi-compare-${layer.number}`}
                  onClick={() => setSelectedLayer(layer)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                    isHighlighted
                      ? "ring-2 ring-cyan-400 bg-slate-900 shadow-lg scale-[1.01]"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                  }`}
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor: layer.color,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                          {layer.nameKo}
                        </span>
                        <span className="text-[10px] text-slate-400">({layer.nameEn})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        PDU: {layer.pdu}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-cyan-400 text-xs">
                    <span className="hidden sm:inline text-[11px]">자세히</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* TCP/IP 4-Layer Stack */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              TCP/IP 4계층 모델 (실무 인터넷)
            </h3>
            <span className="text-[11px] text-slate-400">마우스를 올리면 대응되는 OSI 계층이 강조됩니다</span>
          </div>

          <div className="flex flex-col gap-3">
            {TCPIP_LAYERS.map((layer) => {
              return (
                <div
                  key={`tcp-compare-${layer.number}`}
                  onMouseEnter={() => setHighlightedOsiLayers(layer.osiLayerNumbers)}
                  onMouseLeave={() => setHighlightedOsiLayers([])}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer"
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor: layer.color,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center text-slate-950 shrink-0 font-bold"
                        style={{ backgroundColor: layer.color }}
                      >
                        L{layer.number}
                      </span>
                      <h4 className="text-xs font-bold text-white">{layer.nameKo}</h4>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-slate-700">
                      OSI {layer.osiLayerNumbers.map((n) => `L${n}`).join(", ")} 통합
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">
                    {layer.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {layer.protocols.map((proto) => (
                      <span
                        key={proto}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                      >
                        {proto}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comprehensive Comparison Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center gap-2.5 mb-4">
          <TableIcon className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">
            OSI 7계층 vs TCP/IP 4계층 종합 비교 매트릭스
          </h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-200 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">TCP/IP 계층</th>
                <th className="p-3">OSI 계층</th>
                <th className="p-3">데이터 단위 (PDU)</th>
                <th className="p-3">대표 프로토콜</th>
                <th className="p-3">핵심 장비 / 구현</th>
                <th className="p-3">초보자 핵심 요약</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 text-red-400 font-bold">4. 응용 계층</td>
                <td className="p-3">7. 응용 / 6. 표현 / 5. 세션</td>
                <td className="p-3 font-mono text-cyan-400">Data (메시지)</td>
                <td className="p-3 font-mono">HTTP, HTTPS, DNS, SSH, WebSocket</td>
                <td className="p-3">웹 브라우저, 웹 서버, L7 로드밸런서</td>
                <td className="p-3">사용자가 직접 상호작용하는 웹 애플리케이션</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 text-emerald-400 font-bold">3. 전송 계층</td>
                <td className="p-3">4. 전송 계층</td>
                <td className="p-3 font-mono text-cyan-400">Segment (TCP) / Datagram (UDP)</td>
                <td className="p-3 font-mono">TCP, UDP, QUIC</td>
                <td className="p-3">L4 스위치, 포트 기반 방화벽</td>
                <td className="p-3">포트(Port) 번호로 대상 프로세스 식별 및 신뢰성 전송</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 text-cyan-400 font-bold">2. 인터넷 계층</td>
                <td className="p-3">3. 네트워크 계층</td>
                <td className="p-3 font-mono text-cyan-400">Packet (패킷)</td>
                <td className="p-3 font-mono">IPv4, IPv6, ICMP(Ping), ARP</td>
                <td className="p-3">라우터(Router), L3 스위치, 공유기</td>
                <td className="p-3">IP 주소 기반으로 전 세계 최적 경로(라우팅) 탐색</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3 text-blue-400 font-bold">1. 네트워크 접근</td>
                <td className="p-3">2. 데이터 링크 / 1. 물리</td>
                <td className="p-3 font-mono text-cyan-400">Frame ➔ Bits</td>
                <td className="p-3 font-mono">Ethernet, Wi-Fi(802.11), 광케이블</td>
                <td className="p-3">L2 스위치, 랜카드(NIC), 광케이블/UTP 랜선</td>
                <td className="p-3">MAC 주소 기반 로컬 전송 및 0101 전기 신호 변환</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Layer Detail Modal */}
      <LayerDetailModal
        layer={selectedLayer}
        onClose={() => setSelectedLayer(null)}
      />
    </div>
  );
};
