import { BuilderMission } from "@/types";

export const BUILDER_MISSIONS: BuilderMission[] = [
  {
    id: "mission-1",
    title: "1단계: 일반 웹페이지(HTTP) 요청 패킷 조립하기",
    level: "초급",
    scenario: "클라이언트 PC(192.168.1.10)에서 일반 웹 서버(93.184.216.34)로 웹페이지를 보여달라는 HTTP GET 요청을 보내려고 합니다.",
    task: "웹 브라우징의 표준 HTTP 기본 포트 번호와 목적지 IP를 올바르게 설정하세요.",
    expected: {
      protocol: "HTTP",
      dstPort: 80,
      srcPortMin: 1024,
      srcIp: "192.168.1.10",
      dstIp: "93.184.216.34",
      dstMac: "AA:BB:CC:DD:EE:01",
    },
    hints: [
      "일반 평문 HTTP 프로토콜의 표준 기본 포트는 '80'번입니다.",
      "목적지 IP는 문제에 제시된 '93.184.216.34'입니다.",
      "클라이언트 송신 포트는 보통 1024 이상의 임의의 포트(예: 50001)를 사용합니다.",
    ],
    explanation: "정답입니다! HTTP는 80번 포트를 사용하며, 클라이언트는 운영체제가 무작위로 배정한 임시 포트(Ephemeral Port)를 통해 웹 서버와 1:1 연결을 맺습니다.",
  },
  {
    id: "mission-2",
    title: "2단계: 보안 HTTPS 암호화 웹 패킷 조립하기",
    level: "중급",
    scenario: "사용자가 안전하게 로그인하기 위해 네이버/구글과 같은 보안 웹 서버(142.250.196.110)에 HTTPS 요청을 전송하려고 합니다.",
    task: "SSL/TLS 암호화가 적용되는 HTTPS의 표준 포트 번호(443)와 대상 서버 IP를 설정하세요.",
    expected: {
      protocol: "HTTPS",
      dstPort: 443,
      srcPortMin: 1024,
      srcIp: "192.168.1.10",
      dstIp: "142.250.196.110",
      dstMac: "AA:BB:CC:DD:EE:01",
    },
    hints: [
      "자물쇠 모양이 뜨는 보안 웹 통신(HTTPS)의 표준 포트는 '443'번입니다.",
      "L6 표현 계층에서 TLS 암호화가 적용됩니다.",
    ],
    explanation: "완벽합니다! HTTPS는 443번 포트를 기본으로 사용하며, 전송 계층(L4) 위에서 TLS 핸드셰이크를 거쳐 통신 내용이 완벽히 암호화됩니다.",
  },
  {
    id: "mission-3",
    title: "3단계: 구글 공용 DNS 서버(8.8.8.8)에 질의하기",
    level: "고급",
    scenario: "브라우저가 도메인 주소의 실제 IP를 알기 위해 구글의 공용 DNS 서버(8.8.8.8)에 UDP 질의 패킷을 보냅니다.",
    task: "DNS 질의에 사용되는 표준 포트 번호(53)와 목적지 IP(8.8.8.8)를 입력하세요.",
    expected: {
      protocol: "DNS",
      dstPort: 53,
      srcPortMin: 1024,
      srcIp: "192.168.1.10",
      dstIp: "8.8.8.8",
      dstMac: "AA:BB:CC:DD:EE:01",
    },
    hints: [
      "도메인 네임 시스템(DNS)의 표준 포트는 '53'번입니다.",
      "목적지 IP는 가장 유명한 구글 DNS인 '8.8.8.8'입니다.",
    ],
    explanation: "대단해요! DNS는 속도가 생명이기 때문에 빠른 전송을 위해 전송 계층에서 UDP 53번 포트를 기본적으로 사용합니다.",
  },
];
