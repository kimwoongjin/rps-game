/** 가위바위보 선택지 */
export type Choice = "rock" | "scissors" | "paper";

/** 게임 결과 */
export type Result = "win" | "lose" | "draw";

/** 게임 단계 */
export type GamePhase = "setup" | "playing" | "finished";

/** 판 수 선택지 */
export type RoundCount = 3 | 5 | 10;

/** 선택 가능한 판 수 목록 */
export const ROUND_COUNT_OPTIONS: readonly RoundCount[] = [3, 5, 10] as const;

/** 각 선택지에 대한 이모지 매핑 */
export const CHOICE_EMOJI: Record<Choice, string> = {
  scissors: "✌️",
  rock: "✊",
  paper: "🖐️",
} as const;

/** 각 선택지에 대한 한글 이름 매핑 */
export const CHOICE_LABEL: Record<Choice, string> = {
  scissors: "가위",
  rock: "바위",
  paper: "보",
} as const;

/** 결과에 대한 한글 메시지 매핑 */
export const RESULT_MESSAGE: Record<Result, string> = {
  win: "승리! 🎉",
  lose: "패배 😢",
  draw: "무승부 🤝",
} as const;

/** 결과에 대한 획득 점수 매핑 (승: 3점, 무: 1점, 패: 0점) */
export const POINT_MAP: Record<Result, number> = {
  win: 3,
  draw: 1,
  lose: 0,
} as const;

/** 결과에 대한 CSS 클래스 매핑 */
export const RESULT_COLOR_CLASS: Record<Result, string> = {
  win: "result--win",
  lose: "result--lose",
  draw: "result--draw",
} as const;

/** 승/패/무 카운트 상태 */
export interface ScoreState {
  readonly win: number;
  readonly lose: number;
  readonly draw: number;
}

/** 한 라운드의 결과 */
export interface RoundResult {
  readonly playerChoice: Choice;
  readonly computerChoice: Choice;
  readonly result: Result;
}

/** 게임 전체 상태 */
export interface GameState {
  readonly phase: GamePhase;
  /** 이번 게임에서 플레이할 총 판 수 */
  readonly roundCount: RoundCount;
  /** 현재 진행 중인 라운드 번호 (1부터 시작) */
  readonly currentRoundNumber: number;
  readonly score: ScoreState;
  /** 획득한 총 점수 */
  readonly totalPoints: number;
  readonly currentRound: RoundResult | null;
  readonly isAnimating: boolean;
}

/** 랭킹 항목 */
export interface RankingEntry {
  /** 고유 ID (타임스탬프 기반) */
  readonly id: string;
  readonly playerName: string;
  readonly totalPoints: number;
  /** 이번 게임의 판 수 */
  readonly roundCount: RoundCount;
  readonly score: ScoreState;
  /** ISO 8601 형식 날짜 문자열 */
  readonly createdAt: string;
}

/** 선택 가능한 모든 항목 */
export const CHOICES: readonly Choice[] = ["scissors", "rock", "paper"] as const;

/** 랭킹 최대 저장 개수 */
export const RANKING_MAX_SIZE = 20;
