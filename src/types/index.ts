export type LayerNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface OsiLayer {
  number: LayerNumber;
  id: string;
  nameKo: string;
  nameEn: string;
  pdu: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  summary: string;
  metaphor: string;
  functions: string[];
  protocols: string[];
  hardware: string[];
  headerName: string;
  headerFields: { label: string; example: string; desc: string }[];
  developerTip: string;
}

export interface TcpIpLayer {
  number: 1 | 2 | 3 | 4;
  id: string;
  nameKo: string;
  nameEn: string;
  osiLayerNumbers: LayerNumber[];
  pdu: string;
  protocols: string[];
  description: string;
  color: string;
}

export interface Protocol {
  id: string;
  name: string;
  fullName: string;
  layer: LayerNumber;
  defaultPort?: string;
  transport?: "TCP" | "UDP" | "Both" | "N/A";
  rfc?: string;
  descriptionKo: string;
  keyPoints: string[];
  useCases: string[];
  alternatives: string[];
  importanceKo: string;
}

export type SimulationStage = 
  | "IDLE"
  | "SENDER_ENCAP"
  | "PHYSICAL_TRANSIT"
  | "RECEIVER_DECAP"
  | "COMPLETED";

export interface HeaderBlock {
  layer: LayerNumber;
  name: string;
  tag: string;
  color: string;
  content: string;
  isTrailer?: boolean;
}

export interface SimulationStep {
  stepIndex: number;
  totalSteps: number;
  stage: SimulationStage;
  layerNumber: LayerNumber | 0;
  layerName: string;
  actor: "sender" | "cable" | "receiver";
  title: string;
  actionText: string;
  detailDescription: string;
  currentHeaders: HeaderBlock[];
  payloadText: string;
  bitsSnippet?: string;
  highlightedElementId?: string;
}

export interface PacketPreset {
  id: string;
  label: string;
  protocol: "HTTP" | "HTTPS" | "DNS" | "CUSTOM";
  message: string;
  srcPort: number;
  dstPort: number;
  srcIp: string;
  dstIp: string;
  srcMac: string;
  dstMac: string;
}

export interface BuilderMission {
  id: string;
  title: string;
  level: "초급" | "중급" | "고급";
  scenario: string;
  task: string;
  expected: {
    protocol: string;
    dstPort: number;
    srcPortMin?: number;
    dstIp: string;
    srcIp: string;
    dstMac: string;
  };
  hints: string[];
  explanation: string;
}

export interface QuizItem {
  id: number;
  layerNumber: LayerNumber;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  practicalTip: string;
}
