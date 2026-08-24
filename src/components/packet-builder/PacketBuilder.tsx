"use client";

import React, { useState } from "react";
import { BUILDER_MISSIONS } from "@/domains/packet-builder/scenariosData";
import { BuilderMission } from "@/types";
import confetti from "canvas-confetti";
import { 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Send, 
  RotateCcw, 
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const PacketBuilder: React.FC = () => {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const mission = BUILDER_MISSIONS[currentMissionIndex];

  // User input states
  const [inputProtocol, setInputProtocol] = useState<string>("HTTP");
  const [inputSrcPort, setInputSrcPort] = useState<string>("54321");
  const [inputDstPort, setInputDstPort] = useState<string>("");
  const [inputSrcIp, setInputSrcIp] = useState<string>("192.168.1.10");
  const [inputDstIp, setInputDstIp] = useState<string>("");
  const [inputDstMac, setInputDstMac] = useState<string>("AA:BB:CC:DD:EE:01");
  const [inputPayload, setInputPayload] = useState<string>("GET / HTTP/1.1");

  // Feedback states
  const [validationResult, setValidationResult] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const [showHint, setShowHint] = useState<boolean>(false);

  // Validate handler
  const handleValidatePacket = () => {
    const dstPortNum = parseInt(inputDstPort, 10);
    const srcPortNum = parseInt(inputSrcPort, 10);

    const isProtocolValid = inputProtocol.toUpperCase() === mission.expected.protocol.toUpperCase();
    const isDstPortValid = dstPortNum === mission.expected.dstPort;
    const isDstIpValid = inputDstIp.trim() === mission.expected.dstIp.trim();

    if (!isProtocolValid) {
      setValidationResult({
        status: "error",
        message: `❌ 프로토콜이 올바르지 않습니다. 이번 미션의 대상 프로토콜(${mission.expected.protocol})을 선택해주세요.`,
      });
      return;
    }

    if (isNaN(dstPortNum) || !isDstPortValid) {
      setValidationResult({
        status: "error",
        message: `❌ 목적지 포트 번호가 틀렸습니다. ${mission.expected.protocol}의 표준 포트 번호를 확인해보세요!`,
      });
      return;
    }

    if (!isDstIpValid) {
      setValidationResult({
        status: "error",
        message: `❌ 목적지 IP 주소가 틀렸습니다. 문제에 제시된 대상 IP("${mission.expected.dstIp}")를 정확히 입력해주세요.`,
      });
      return;
    }

    // Success!
    setValidationResult({
      status: "success",
      message: `🎉 정답입니다! 패킷이 완벽하게 조립되어 목적지(${mission.expected.dstIp}:${mission.expected.dstPort})로 정상 송출되었습니다!`,
    });

    // Fire Confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Fallback
    }
  };

  const handleNextMission = () => {
    if (currentMissionIndex < BUILDER_MISSIONS.length - 1) {
      const nextIdx = currentMissionIndex + 1;
      setCurrentMissionIndex(nextIdx);
      setValidationResult({ status: "idle", message: "" });
      setShowHint(false);
      setInputDstPort("");
      setInputDstIp("");
    }
  };

  const handleResetMission = () => {
    setValidationResult({ status: "idle", message: "" });
    setShowHint(false);
    setInputDstPort("");
    setInputDstIp("");
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                패킷 빌더 실습실 (Hands-on Packet Lab)
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {mission.level}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                주어진 실무 시나리오에 맞추어 포트 번호와 IP 주소 헤더를 직접 조립하고 패킷을 전송해 보세요!
              </p>
            </div>
          </div>

          {/* Mission Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {BUILDER_MISSIONS.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  setCurrentMissionIndex(idx);
                  handleResetMission();
                }}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                  currentMissionIndex === idx
                    ? "bg-cyan-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                미션 {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario Briefing Card */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-slate-900 to-cyan-950/30 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            {mission.title}
          </h3>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-1 font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? "힌트 닫기" : "힌트 보기"}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          📋 <strong className="text-cyan-300">시나리오:</strong> {mission.scenario}
        </p>

        <p className="text-xs sm:text-sm text-amber-200 font-bold bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
          🎯 <strong className="text-white">수행 과제:</strong> {mission.task}
        </p>

        {showHint && (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 animate-fadeIn">
            <span className="text-xs font-bold text-amber-400 block mb-1">💡 힌트 안내:</span>
            {mission.hints.map((h, i) => (
              <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{h}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Packet Assembly Form */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          계층별 패킷 헤더 조립 랙 (Packet Assembly Rack)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* L7 Application Payload */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-red-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400">L7 응용 계층 (Payload)</span>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">Data</span>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">프로토콜 선택</label>
              <select
                value={inputProtocol}
                onChange={(e) => setInputProtocol(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-red-500"
              >
                <option value="HTTP">HTTP</option>
                <option value="HTTPS">HTTPS</option>
                <option value="DNS">DNS</option>
              </select>
            </div>
          </div>

          {/* L4 Transport Ports */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">L4 전송 계층 (Port)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">Segment</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-400">출발지 포트 (Src Port)</label>
                <input
                  type="text"
                  value={inputSrcPort}
                  onChange={(e) => setInputSrcPort(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-emerald-300 font-bold">도착지 포트 (Dst Port) *</label>
                <input
                  type="number"
                  value={inputDstPort}
                  onChange={(e) => setInputDstPort(e.target.value)}
                  placeholder="예: 80, 443..."
                  className="w-full bg-slate-900 border border-emerald-500/70 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-400 font-bold"
                />
              </div>
            </div>
          </div>

          {/* L3 Network IP */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">L3 네트워크 계층 (IP)</span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">Packet</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-400">출발지 IP (Src IP)</label>
                <input
                  type="text"
                  value={inputSrcIp}
                  onChange={(e) => setInputSrcIp(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-cyan-300 font-bold">목적지 IP (Dst IP) *</label>
                <input
                  type="text"
                  value={inputDstIp}
                  onChange={(e) => setInputDstIp(e.target.value)}
                  placeholder="예: 93.184.216.34"
                  className="w-full bg-slate-900 border border-cyan-500/70 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-400 font-bold"
                />
              </div>
            </div>
          </div>

          {/* L2 Data Link MAC */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400">L2 데이터 링크 계층 (MAC)</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">Frame</span>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">목적지 게이트웨이 MAC 주소</label>
              <input
                type="text"
                value={inputDstMac}
                onChange={(e) => setInputDstMac(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Validation Result Box */}
        {validationResult.status !== "idle" && (
          <div
            className={`p-4 rounded-xl border animate-fadeIn flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              validationResult.status === "success"
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                : "bg-red-950/40 border-red-500/50 text-red-200"
            }`}
          >
            <div className="flex items-start gap-2.5">
              {validationResult.status === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-xs sm:text-sm font-semibold">{validationResult.message}</p>
                {validationResult.status === "success" && (
                  <p className="text-xs text-emerald-300/80 mt-1">{mission.explanation}</p>
                )}
              </div>
            </div>

            {validationResult.status === "success" && currentMissionIndex < BUILDER_MISSIONS.length - 1 && (
              <button
                onClick={handleNextMission}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-lg transition-all"
              >
                <span>다음 미션 도전하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleResetMission}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>초기화</span>
          </button>
          <button
            onClick={handleValidatePacket}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>패킷 조립 및 유효성 검사</span>
          </button>
        </div>
      </div>
    </div>
  );
};
