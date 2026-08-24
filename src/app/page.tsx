"use client";

import React, { useState } from "react";
import { Navbar, NavTab } from "@/components/navbar/Navbar";
import { PacketSimulator } from "@/components/simulator/PacketSimulator";
import { PacketBuilder } from "@/components/packet-builder/PacketBuilder";
import { LayerComparison } from "@/components/layers/LayerComparison";
import { ProtocolDirectory } from "@/components/protocols/ProtocolDirectory";
import { NetworkQuiz } from "@/components/quiz/NetworkQuiz";
import { LayerDetailModal } from "@/components/layers/LayerDetailModal";
import { OSI_LAYERS } from "@/domains/osi/layersData";
import { OsiLayer, LayerNumber } from "@/types";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("simulator");
  const [modalLayer, setModalLayer] = useState<OsiLayer | null>(null);

  const handleOpenLayerModal = (layerNumber: LayerNumber) => {
    const found = OSI_LAYERS.find((l) => l.number === layerNumber);
    if (found) {
      setModalLayer(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Header Navigation */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "simulator" && (
          <PacketSimulator onSelectLayerForDetail={handleOpenLayerModal} />
        )}

        {activeTab === "builder" && <PacketBuilder />}

        {activeTab === "layers" && <LayerComparison />}

        {activeTab === "protocols" && <ProtocolDirectory />}

        {activeTab === "quiz" && <NetworkQuiz />}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">OSI Interactive Lab</span>
            <span>•</span>
            <span>성원님을 위한 맞춤형 네트워크 인터랙티브 시뮬레이터</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              RFC 표준 기반 데이터 검증
            </span>
            <span>Next.js LTS & Tailwind CSS</span>
          </div>
        </div>
      </footer>

      {/* Layer Detail Modal (Global) */}
      <LayerDetailModal
        layer={modalLayer}
        onClose={() => setModalLayer(null)}
      />
    </div>
  );
}
