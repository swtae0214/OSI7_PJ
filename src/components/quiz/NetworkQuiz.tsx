"use client";

import React, { useState } from "react";
import { NETWORK_QUIZ_DATA } from "@/domains/quiz/quizData";
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import confetti from "canvas-confetti";

export const NetworkQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = NETWORK_QUIZ_DATA[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < NETWORK_QUIZ_DATA.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score >= 6) {
        try {
          confetti({ particleCount: 120, spread: 80 });
        } catch {
          // Fallback
        }
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Panel */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                OSI 7계층 & 네트워크 이해도 챌린지 퀴즈
              </h2>
              <p className="text-xs text-slate-400">
                실제 개발 면접과 실무에서 자주 등장하는 네트워크 문제들을 풀며 복습해 보세요!
              </p>
            </div>
          </div>

          {!isFinished && (
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-cyan-400">
              {currentIdx + 1} / {NETWORK_QUIZ_DATA.length}
            </div>
          )}
        </div>
      </div>

      {isFinished ? (
        /* Results View */
        <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">퀴즈 완료! 수고하셨습니다 🎉</h3>
            <p className="text-sm text-slate-400 mt-1">
              총 {NETWORK_QUIZ_DATA.length}문제 중{" "}
              <strong className="text-cyan-400 text-lg">{score}개</strong>를 맞히셨습니다!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 max-w-md mx-auto border border-slate-800 text-xs text-slate-300">
            {score === NETWORK_QUIZ_DATA.length ? (
              <p className="text-emerald-400 font-bold">
                🏆 만점입니다! OSI 7계층과 네트워크 기본기가 완벽하게 정리되셨군요!
              </p>
            ) : score >= 5 ? (
              <p className="text-cyan-300 font-medium">
                👏 훌륭해요! 대부분의 핵심 원리를 잘 이해하고 계십니다. 시뮬레이터로 조금만 더 복습해보세요!
              </p>
            ) : (
              <p className="text-amber-300 font-medium">
                📚 패킷 시뮬레이터와 프로토콜 백과를 둘러본 후 다시 한 번 도전해보세요!
              </p>
            )}
          </div>

          <button
            onClick={handleRestartQuiz}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>처음부터 다시 풀기</span>
          </button>
        </div>
      ) : (
        /* Quiz Question Card */
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
          {/* Question Text */}
          <div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Q{currentIdx + 1}. OSI {currentQuestion.layerNumber}계층 관련 문제
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-3 leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === currentQuestion.answer;

              let btnStyle = "bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-900 hover:border-slate-700";

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500";
                } else if (isSelected) {
                  btnStyle = "bg-red-950/60 border-red-500 text-red-200 font-bold";
                } else {
                  btnStyle = "bg-slate-950/30 border-slate-900 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <Lightbulb className="w-4 h-4" />
                <span>해설 및 정답</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {currentQuestion.explanation}
              </p>
              <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
                <strong>실무 팁: </strong>{currentQuestion.practicalTip}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <span>{currentIdx < NETWORK_QUIZ_DATA.length - 1 ? "다음 문제" : "결과 확인하기"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
