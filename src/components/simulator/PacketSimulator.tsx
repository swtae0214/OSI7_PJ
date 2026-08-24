"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { PRESET_PACKETS, generateSimulationSteps } from "@/domains/simulator/simulationEngine";
import { PacketPreset, LayerNumber } from "@/types";
import { AnimationCanvas } from "./AnimationCanvas";
import { HeaderInspector } from "./HeaderInspector";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack, 
  Send, 
  Sliders, 
  Sparkles,
  Info,
  CheckCircle2,
  Settings2
} from "lucide-react";

interface PacketSimulatorProps {
  onSelectLayerForDetail?: (layerNumber: LayerNumber) => void;
}

export const PacketSimulator: React.FC<PacketSimulatorProps> = ({
  onSelectLayerForDetail,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PacketPreset>(PRESET_PACKETS[0]);
  const [customMessage, setCustomMessage] = useState(PRESET_PACKETS[0].message);
  const [customProtocol, setCustomProtocol] = useState<"HTTP" | "HTTPS" | "DNS" | "CUSTOM">(
    PRESET_PACKETS[0].protocol
  );

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 0.5x, 1x, 2x

  const activeConfig: PacketPreset = {
    ...selectedPreset,
    message: customMessage,
    protocol: customProtocol,
  };

  const steps = generateSimulationSteps(activeConfig);
  const currentStep = steps[currentStepIndex] || steps[0];

  // Auto-play timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNextStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1;
      } else {
        setIsPlaying(false);
        return prev;
      }
    });
  }, [steps.length]);

  const handlePrevStep = useCallback(() => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  // Timer loop for auto playback
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = 1800 / speedMultiplier;
      timerRef.current = setInterval(() => {
        handleNextStep();
      }, stepDuration);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMultiplier, handleNextStep]);

  // When preset changes
  const handlePresetSelect = (preset: PacketPreset) => {
    setSelectedPreset(preset);
    setCustomMessage(preset.message);
    setCustomProtocol(preset.protocol);
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const progressPercentage = Math.round(
    (currentStepIndex / (steps.length - 1)) * 100
  );

  return (
    <div className="space-y-6">
      {/* 1. Control & Input Panel */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              패킷 시뮬레이션 설정 및 제어
            </h2>
            <p className="text-xs text-slate-400">
              전송할 메시지와 프로토콜을 선택하고 재생 버튼을 눌러 7계층 캡슐화 과정을 관찰하세요.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5">
            {PRESET_PACKETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  selectedPreset.id === preset.id
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm"
                    : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input and Protocol Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
              프로토콜
            </label>
            <select
              value={customProtocol}
              onChange={(e) => {
                const proto = e.target.value as "HTTP" | "HTTPS" | "DNS" | "CUSTOM";
                setCustomProtocol(proto);
                handleReset();
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-semibold"
            >
              <option value="HTTP">HTTP (기본 웹 - 80)</option>
              <option value="HTTPS">HTTPS (보안 웹 - 443)</option>
              <option value="DNS">DNS (도메인 조회 - 53)</option>
              <option value="CUSTOM">CUSTOM (사용자 지정 포트)</option>
            </select>
          </div>

          <div className="md:col-span-7">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              전송할 메시지 (Payload)
            </label>
            <div className="relative">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => {
                  setCustomMessage(e.target.value);
                  handleReset();
                }}
                placeholder="전송할 텍스트를 입력하세요 (예: GET /index.html)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              onClick={() => {
                handleReset();
                setIsPlaying(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>전송 시작</span>
            </button>
          </div>
        </div>

        {/* Playback Controls & Timeline Slider */}
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                isPlaying
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                  : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? "일시정지" : "자동 재생"}</span>
            </button>

            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:pointer-events-none"
              title="이전 단계"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === steps.length - 1}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:pointer-events-none"
              title="다음 단계"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white"
              title="처음으로 리셋"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed Controller */}
            <div className="hidden sm:flex items-center gap-1 ml-2 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-xs">
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              {[0.5, 1, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSpeedMultiplier(speed)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    speedMultiplier === speed
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Step Timeline Progress */}
          <div className="flex-1 max-w-md flex items-center gap-3">
            <input
              type="range"
              min="0"
              max={steps.length - 1}
              value={currentStepIndex}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentStepIndex(Number(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-xs font-mono font-bold text-slate-300 whitespace-nowrap">
              {currentStepIndex + 1} / {steps.length} 단계
            </span>
          </div>
        </div>
      </div>

      {/* 2. Step Notification & Current Action Box */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900 to-cyan-950/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shrink-0">
              {currentStep.stage === "COMPLETED" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {currentStep.layerName}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  진행률: {progressPercentage}%
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {currentStep.actionText}
              </p>
            </div>
          </div>

          <div className="self-end sm:self-center shrink-0">
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block">통신 주체</span>
              <span className="text-xs font-bold text-slate-200">
                {currentStep.actor === "sender" && "💻 송신 클라이언트"}
                {currentStep.actor === "cable" && "⚡ 광케이블 / 인터넷망"}
                {currentStep.actor === "receiver" && "🖥️ 수신 웹서버"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Visual Animation Canvas (Dual Device Stacks) */}
      <AnimationCanvas
        currentStep={currentStep}
        onLayerClick={onSelectLayerForDetail}
      />

      {/* 4. Live Header Inspector */}
      <HeaderInspector
        currentHeaders={currentStep.currentHeaders}
        payloadText={currentStep.payloadText}
        stage={currentStep.stage}
        layerNumber={currentStep.layerNumber}
        bitsSnippet={currentStep.bitsSnippet}
      />
    </div>
  );
};
