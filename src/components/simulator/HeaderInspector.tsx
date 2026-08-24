"use client";

import React from "react";
import { HeaderBlock, LayerNumber } from "@/types";
import { Layers, Package, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

interface HeaderInspectorProps {
  currentHeaders: HeaderBlock[];
  payloadText: string;
  stage: string;
  layerNumber: LayerNumber | 0;
  bitsSnippet?: string;
}

export const HeaderInspector: React.FC<HeaderInspectorProps> = ({
  currentHeaders,
  payloadText,
  stage,
  layerNumber,
  bitsSnippet,
}) => {
  // Determine current PDU name based on layer
  const getPduInfo = () => {
    if (stage === "COMPLETED") return { pdu: "Data (전송 완료)", desc: "응용 프로그램에 원본 데이터가 전달되었습니다." };
    if (bitsSnippet) return { pdu: "Bits (0과 1)", desc: "물리 계층 전기/광 신호로 변환된 상태입니다." };
    if (layerNumber === 2) return { pdu: "Frame (프레임)", desc: "MAC 헤더와 FCS 트레일러가 결합된 프레임 상태입니다." };
    if (layerNumber === 3) return { pdu: "Packet (패킷)", desc: "출발지/도착지 IP 주소가 부여된 패킷 상태입니다." };
    if (layerNumber === 4) return { pdu: "Segment (세그먼트)", desc: "포트 번호와 시퀀스 번호가 결합된 세그먼트 상태입니다." };
    return { pdu: "Data (페이로드)", desc: "응용/표현/세션 계층의 순수 데이터 상태입니다." };
  };

  const pduInfo = getPduInfo();

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              실시간 패킷 구조 인스펙터 (PDU Header View)
            </h3>
            <p className="text-xs text-slate-400">
              현재 패킷에 씌워져 있는 계층별 헤더와 페이로드를 실시간으로 뜯어봅니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 font-medium">현재 PDU:</span>
          <span className="text-xs font-bold text-cyan-400">{pduInfo.pdu}</span>
        </div>
      </div>

      {/* Visual Header Blocks Structure */}
      <div className="my-5">
        <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>캡슐화 블록 (왼쪽부터 전송되는 순서):</span>
        </div>

        {bitsSnippet ? (
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50 flex flex-col gap-2 animate-pulse">
            <div className="flex items-center justify-between text-xs text-purple-300 font-bold">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                L1 물리 계층 비트열 (Bitstream Signal)
              </span>
              <span className="text-[11px] bg-purple-900/60 px-2 py-0.5 rounded text-purple-200">
                0101 신호 전송 중
              </span>
            </div>
            <p className="font-mono text-sm tracking-wider text-purple-200 break-all bg-purple-950/80 p-3 rounded-lg border border-purple-900">
              {bitsSnippet}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-stretch gap-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 min-h-[90px] items-center">
            {currentHeaders.length === 0 ? (
              <div className="w-full text-center py-6 text-xs text-slate-500">
                현재 캡슐화된 헤더가 없습니다. 시뮬레이션을 시작하면 헤더가 추가됩니다.
              </div>
            ) : (
              <>
                {currentHeaders.map((header, index) => {
                  return (
                    <div
                      key={`${header.tag}-${index}`}
                      className="flex flex-col justify-between p-2.5 rounded-lg border transition-all duration-300 shadow-md animate-fadeIn"
                      style={{
                        backgroundColor: `${header.color}15`,
                        borderColor: `${header.color}50`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-[10px] font-extrabold px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: header.color }}
                        >
                          {header.tag}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {header.name}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-xs font-semibold text-slate-200">
                        {header.content}
                      </div>
                    </div>
                  );
                })}

                {/* Main Payload Center */}
                <div className="flex-1 min-w-[200px] p-2.5 rounded-lg bg-red-500/10 border border-red-500/40 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-red-600 text-white">
                      PAYLOAD
                    </span>
                    <span className="text-[10px] text-red-400 font-medium">
                      사용자 데이터 본문
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-xs text-slate-200 truncate">
                    &quot;{payloadText}&quot;
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Beginner Metaphor Explanation */}
      <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-amber-300">초보자를 위한 원리: </span>
          {pduInfo.desc} 송신 측에서는 상위 계층에서 하위 계층으로 갈수록 헤더가 계속 감싸지는{" "}
          <strong className="text-cyan-300 font-semibold">캡슐화(Encapsulation)</strong>가 일어나고, 수신 측에서는 도착할 때마다 헤더를 하나씩 벗겨내는{" "}
          <strong className="text-emerald-300 font-semibold">역캡슐화(Decapsulation)</strong>가 일어납니다.
        </div>
      </div>
    </div>
  );
};
