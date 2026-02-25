# 🪨 가위바위보 게임 ✌️

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)

> React 19 + TypeScript + Vite로 구현한 가위바위보 게임입니다. 컴퓨터와 대결하며 점수를 획득하고 랭킹에 도전하세요! 🏆

## 🎮 프로젝트 소개

이 프로젝트는 **유저 vs 컴퓨터** 가위바위보 게임으로, 판 수 선택, 점수 시스템, 등급 시스템, 영구 랭킹 저장 기능을 갖춘 완전한 게임입니다. CSS-only 애니메이션과 반응형 UI를 지원합니다.

## ✨ 주요 기능

- 🖥️ **유저 vs 컴퓨터** 대결
- 📊 **판 수 선택** — 3판 / 5판 / 10판
- 🏅 **점수 시스템** — 승리 +3점, 무승부 +1점, 패배 +0점
- 👆 **이모지 표시** — 가위 ✌️, 바위 ✊, 보 🖐️
- ⚔️ **VS 레이아웃** — 유저 선택 vs 컴퓨터 선택 나란히 표시
- 📈 **결과 화면** — 최종 점수, 달성률, 등급, 전적 요약
- 💾 **랭킹 등록** — 이름 입력 후 localStorage에 영구 저장
- 🏆 **랭킹 보드** — 점수 내림차순, 상위 20개, 1~3위 메달 이모지
- 🎨 **애니메이션** — reveal, shuffle, fadeInBounce, pulse 등 CSS 애니메이션
- 📱 **반응형** — 모바일 대응 (max-width 480px)

## 🛠️ 기술 스택

| 기술 | 버전 |
|------|------|
| React | 19.2.0 |
| TypeScript | 5.9.3 (strict mode) |
| Vite | 7.3.1 |
| ESLint | 9.39.1 |
| Prettier | 3.8.1 |

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 빌드 미리보기

```bash
npm run preview
```

### ESLint 검사

```bash
npm run lint
```

## 🎯 게임 방법

1. **판 수 선택** — 게임 시작 전 3판, 5판, 10판 중 선택
2. **가위바위보 선택** — 가위 ✌️, 바위 ✊, 보 🖐️ 중 하나 선택
3. **결과 확인** — 컴퓨터의 선택과 승패 확인
4. **점수 획득** — 승리 시 +3점, 무승부 시 +1점
5. **게임 종료** — 모든 판 완료 후 최종 점수 확인
6. **랭킹 등록** — 이름을 입력하여 랭킹에 기록
7. **랭킹 확인** — 다른 플레이어들의 점수 확인

## 📊 점수 시스템

| 결과 | 점수 | 이모지 |
|------|------|--------|
| 승리 | +3 | 🏆 |
| 무승부 | +1 | 🤝 |
| 패배 | +0 | 😢 |

## 🏅 등급 시스템

| 등급 | 조건 | 이모지 |
|------|------|--------|
| 👑 전설 | 90%+ | 💎 |
| 💎 다이아 | 70%+ | 💎 |
| 🥇 골드 | 50%+ | 🥇 |
| 🥈 실버 | 30%+ | 🥈 |
| 🥉 브론즈 | ~30% | 🥉 |

## 📁 프로젝트 구조

```
rps-game/
├── src/
│   ├── types/
│   │   └── game.ts              # GamePhase, RoundCount, POINT_MAP, RankingEntry 등 타입 정의
│   ├── hooks/
│   │   ├── useGame.ts           # 게임 로직 커스텀 훅 (판수/점수/라운드완료)
│   │   └── useRanking.ts        # localStorage 랭킹 CRUD 훅
│   ├── components/
│   │   ├── GameSetup.tsx        # 판 수 선택 화면 (3판/5판/10판)
│   │   ├── GameResult.tsx       # 게임 완료 결과 + 랭킹 등록 화면
│   │   ├── RankingBoard.tsx     # 랭킹 목록 화면
│   │   ├── GameBoard.tsx        # phase 기반 화면 전환 메인 보드
│   │   ├── ChoiceButton.tsx     # 가위/바위/보 선택 버튼
│   │   ├── ResultDisplay.tsx    # VS 레이아웃 결과 표시
│   │   └── ScoreBoard.tsx        # 승/패/무 카운트 표시
│   ├── App.tsx                  # 메인 앱 컴포넌트
│   ├── App.css                  # 앱 스타일
│   ├── index.css                # 글로벌 스타일
│   └── main.tsx                 # 앱 진입점
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── .prettierrc                  # Prettier 설정 (printWidth: 120, double quote, trailingComma: all)
```

## 📜 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (Vite HMR) |
| `npm run build` | TypeScript 컴파일 + 프로덕션 빌드 |
| `npm run lint` | ESLint 검사 실행 |
| `npm run preview` | 빌드된 파일 미리보기 |

## 🎨 코드 스타일

이 프로젝트는 다음 Prettier 설정을 사용합니다:

- `printWidth`: 120
- `singleQuote`: false (double quote 사용)
- `trailingComma`: all
- `semi`: true
- `tabWidth`: 2

---

Made with ❤️ by [yesjin](https://github.com/yesjin)
