# 🌐 OSI Interactive Lab (OSI 7계층 & TCP/IP 인터랙티브 시뮬레이터)

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10.28-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **"보는 시뮬레이터"를 넘어 "직접 만지고 조립하며 이해하는" 현대적인 네트워크 학습 플랫폼**  
> OSI 7계층 및 TCP/IP 4계층의 데이터 캡슐화/역캡슐화 과정, 프로토콜 헤더 구조, 핵심 장비의 역할을 인터랙티브하게 실습할 수 있습니다.

---

## ✨ 핵심 기능 (Features)

### 1. 📨 15단계 실시간 패킷 흐름 시뮬레이터 (`PacketSimulator`)
- **Dual-Device Visualization**: 송신 클라이언트 ➔ 물리 케이블 전송선로 ➔ 수신 서버 간의 패킷 이동 실시간 시각화
- **단계별 탐색 제어**: `Play / Pause`, `1단계씩 앞/뒤 탐색`, `재생 속도 조절(0.5x, 1x, 2x)`, `타임라인 슬라이더`
- **PDU 헤더 인스펙터**:
  - `L7 Data` ➔ `L6 TLS/MIME` ➔ `L5 Session` ➔ `L4 Segment (Port)` ➔ `L3 Packet (IP)` ➔ `L2 Frame (MAC/FCS)` ➔ `L1 Bits (0101...)`
- **프리셋 지원**: HTTP GET 웹 요청, HTTPS 보안 로그인, DNS 도메인 질의, 사용자 정의 메시지

### 2. 🧩 패킷 빌더 실습실 (Hands-on Packet Lab)
- **실무 미션 기반 학습**:
  - 초급: 웹 브라우징(HTTP) 80번 포트 및 대상 서버 IP 조립
  - 중급: 보안 웹(HTTPS) 443번 포트 및 TLS 암호화 패킷 조립
  - 고급: 구글 공용 DNS(8.8.8.8) 53번 UDP 질의 패킷 조립
- **실시간 검증 & 축하 효과**: 포트/IP 유효성 검사 및 정답 시 폭죽 애니메이션(`canvas-confetti`) 제공

### 3. 📊 OSI 7계층 vs TCP/IP 4계층 비교 매트릭스
- 두 모델 간의 상호 매핑 관계를 실시간 인터랙티브 하이라이트로 비교
- 각 계층 클릭 시 **택배 비유 설명**, **PDU**, **실제 헤더 필드 규격**, **관련 하드웨어**, **웹 개발자 실무 팁** 모달 제공

### 4. 📚 네트워크 프로토콜 백과사전
- HTTP, HTTPS, DNS, WebSocket, TLS/SSL, TCP, UDP, QUIC, IPv4/IPv6, ICMP, ARP, Ethernet, DHCP, SSH 등 14종 이상의 핵심 프로토콜 수록
- 검색창 및 계층별 필터링 기능 제공

### 5. 🎯 네트워크 이해도 챌린지 퀴즈
- 개발자 기술 면접 및 실무 기초 8문제 수록
- 정답 선택 시 즉각적인 해설 및 실무 팁 피드백 제공

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS (Dark Glassmorphism UI)
- **Icons**: Lucide React
- **Animation & Effects**: Canvas Confetti, CSS Keyframe Animations
- **Package Manager**: pnpm

---

## 🚀 빠른 시작 (Getting Started)

### 1. 저장소 복제 (Clone)
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/osi7-simulator.git
cd osi7-simulator
```

### 2. 의존성 패키지 설치
```bash
pnpm install
```

### 3. 로컬 개발 서버 실행
```bash
pnpm dev
```
브라우저에서 `http://localhost:3000`으로 접속합니다.

### 4. 프로덕션 빌드
```bash
pnpm build
pnpm start
```

---

## 📂 프로젝트 구조 (Architecture)

```text
src/
├── app/                      # Next.js App Router (Layout, Page, Global CSS)
├── components/               # UI 컴포넌트
│   ├── navbar/               # 상단 네비게이션 & 팁 티커
│   ├── simulator/            # 15단계 패킷 시뮬레이터 & 헤더 인스펙터
│   ├── packet-builder/       # 패킷 조립 실습 랩
│   ├── layers/               # OSI 7 vs TCP/IP 4 비교 매트릭스 & 상세 모달
│   ├── protocols/            # 프로토콜 백과사전
│   └── quiz/                 # 네트워크 퀴즈 모듈
├── domains/                  # 도메인 모델 및 정적 데이터
│   ├── osi/                  # OSI 7계층 / TCP/IP 계층 데이터
│   ├── protocols/            # 14+ 프로토콜 상세 데이터
│   ├── simulator/            # 시뮬레이션 상태 머신 생성 엔진
│   ├── packet-builder/       # 실습 미션 데이터
│   └── quiz/                 # 퀴즈 문항 및 실무 팁 데이터
├── types/                    # 전역 TypeScript 인터페이스
└── lib/                      # 유틸리티 함수
```

---

## 📄 라이선스 (License)

This project is licensed under the MIT License.
