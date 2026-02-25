import { useState, useCallback } from "react";
import type { Choice, Result, GameState, RoundResult, ScoreState, RoundCount } from "../types/game";
import { CHOICES, POINT_MAP } from "../types/game";

/** 애니메이션 지속 시간 (ms) */
const ANIMATION_DURATION = 800;

/** 초기 스코어 상태 */
const INITIAL_SCORE: ScoreState = {
  win: 0,
  lose: 0,
  draw: 0,
} as const;

/** 초기 게임 상태 (설정 화면) */
const INITIAL_STATE: GameState = {
  phase: "setup",
  roundCount: 5,
  currentRoundNumber: 0,
  score: INITIAL_SCORE,
  totalPoints: 0,
  currentRound: null,
  isAnimating: false,
} as const;

/**
 * 컴퓨터의 랜덤 선택을 반환하는 함수
 * Math.random() 의존성으로 순수하지 않지만, 의도적인 부수 효과
 */
const getRandomChoice = (): Choice => {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
};

/**
 * 승패를 판정하는 순수 함수
 * @param player - 유저의 선택
 * @param computer - 컴퓨터의 선택
 * @returns 게임 결과
 */
const judgeResult = (player: Choice, computer: Choice): Result => {
  if (player === computer) return "draw";

  /** 각 선택이 이기는 상대 매핑 */
  const winMap: Record<Choice, Choice> = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  return winMap[player] === computer ? "win" : "lose";
};

/**
 * 스코어를 업데이트하는 순수 함수
 * @param prevScore - 이전 스코어
 * @param result - 이번 라운드 결과
 * @returns 새로운 스코어
 */
const updateScore = (prevScore: ScoreState, result: Result): ScoreState => ({
  ...prevScore,
  [result]: prevScore[result] + 1,
});

/**
 * 가위바위보 게임 로직을 관리하는 커스텀 훅
 * @returns 게임 상태와 액션 함수들
 */
export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  /** 게임 시작 (판 수 선택 후 호출) */
  const startGame = useCallback((roundCount: RoundCount): void => {
    setGameState({
      phase: "playing",
      roundCount,
      currentRoundNumber: 1,
      score: INITIAL_SCORE,
      totalPoints: 0,
      currentRound: null,
      isAnimating: false,
    });
  }, []);

  /** 유저가 선택했을 때 실행되는 핸들러 */
  const play = useCallback(
    (playerChoice: Choice): void => {
      // 게임 중이 아니거나 애니메이션 중에는 선택 불가
      if (gameState.phase !== "playing" || gameState.isAnimating) return;

      // 애니메이션 시작
      setGameState((prev) => ({
        ...prev,
        isAnimating: true,
        currentRound: null,
      }));

      // 애니메이션 후 결과 표시
      setTimeout(() => {
        const computerChoice = getRandomChoice();
        const result = judgeResult(playerChoice, computerChoice);
        const earnedPoints = POINT_MAP[result];

        const roundResult: RoundResult = {
          playerChoice,
          computerChoice,
          result,
        };

        setGameState((prev) => {
          const newScore = updateScore(prev.score, result);
          const newTotalPoints = prev.totalPoints + earnedPoints;
          const newRoundNumber = prev.currentRoundNumber + 1;
          // 마지막 라운드가 끝나면 게임 완료 단계로 전환
          const isLastRound = prev.currentRoundNumber >= prev.roundCount;

          return {
            ...prev,
            phase: isLastRound ? "finished" : "playing",
            currentRoundNumber: newRoundNumber,
            score: newScore,
            totalPoints: newTotalPoints,
            currentRound: roundResult,
            isAnimating: false,
          };
        });
      }, ANIMATION_DURATION);
    },
    [gameState.phase, gameState.isAnimating],
  );

  /** 설정 화면으로 돌아가기 (전체 초기화) */
  const reset = useCallback((): void => {
    setGameState(INITIAL_STATE);
  }, []);

  return {
    phase: gameState.phase,
    roundCount: gameState.roundCount,
    currentRoundNumber: gameState.currentRoundNumber,
    score: gameState.score,
    totalPoints: gameState.totalPoints,
    currentRound: gameState.currentRound,
    isAnimating: gameState.isAnimating,
    startGame,
    play,
    reset,
  } as const;
};
