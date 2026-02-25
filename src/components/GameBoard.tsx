import { useState } from "react";
import { useGame } from "../hooks/useGame";
import { useRanking } from "../hooks/useRanking";
import type { RoundCount } from "../types/game";
import { CHOICES, POINT_MAP } from "../types/game";
import ChoiceButton from "./ChoiceButton";
import ResultDisplay from "./ResultDisplay";
import GameSetup from "./GameSetup";
import GameResult from "./GameResult";
import RankingBoard from "./RankingBoard";

/**
 * 메인 게임 보드 컴포넌트
 * phase에 따라 설정 화면 / 게임 화면 / 결과 화면 / 랭킹 화면을 전환
 */
const GameBoard = () => {
  const {
    phase,
    roundCount,
    currentRoundNumber,
    score,
    totalPoints,
    currentRound,
    isAnimating,
    startGame,
    play,
    reset,
  } = useGame();

  const { rankings, addRanking, clearRanking } = useRanking();

  /** 랭킹 화면 표시 여부 */
  const [showRanking, setShowRanking] = useState(false);
  /** 방금 등록된 랭킹 항목의 ID (랭킹 화면에서 하이라이트용) */
  const [lastRegisteredId, setLastRegisteredId] = useState<string | null>(null);

  /** 게임 시작 핸들러 */
  const handleStart = (count: RoundCount) => {
    startGame(count);
  };

  /** 랭킹 등록 핸들러 */
  const handleRegisterRanking = (playerName: string) => {
    const id = addRanking(playerName, totalPoints, roundCount, score);
    setLastRegisteredId(id);
  };

  /** 다시하기 (설정 화면으로) */
  const handleRestart = () => {
    reset();
    setLastRegisteredId(null);
  };

  /** 랭킹 화면 열기 */
  const handleShowRanking = () => {
    setShowRanking(true);
  };

  /** 랭킹 화면 닫기 */
  const handleBackFromRanking = () => {
    setShowRanking(false);
  };

  /** 랭킹 초기화 후 화면 유지 */
  const handleClearRanking = () => {
    clearRanking();
    setLastRegisteredId(null);
  };

  // ─── 랭킹 화면 ───────────────────────────────────────
  if (showRanking) {
    return (
      <RankingBoard
        rankings={rankings}
        onBack={handleBackFromRanking}
        onClear={handleClearRanking}
        highlightId={lastRegisteredId}
      />
    );
  }

  // ─── 설정 화면 ───────────────────────────────────────
  if (phase === "setup") {
    return <GameSetup onStart={handleStart} onShowRanking={handleShowRanking} />;
  }

  // ─── 결과 화면 ───────────────────────────────────────
  if (phase === "finished") {
    return (
      <GameResult
        totalPoints={totalPoints}
        roundCount={roundCount}
        score={score}
        onRegisterRanking={handleRegisterRanking}
        onRestart={handleRestart}
      />
    );
  }

  // ─── 게임 진행 화면 ──────────────────────────────────
  /** 완료된 라운드 수 (현재 라운드 번호 - 1) */
  const completedRounds = currentRoundNumber - 1;
  /** 이번 라운드에서 획득 예정 점수 */
  const lastEarnedPoints = currentRound !== null ? POINT_MAP[currentRound.result] : null;

  return (
    <div className="game-board">
      {/* 게임 헤더 (라운드 진행 상황) */}
      <div className="game-board__header">
        <button
          className="game-board__back-button"
          onClick={handleRestart}
          type="button"
          aria-label="게임 종료하고 설정으로 돌아가기"
        >
          ✕
        </button>
        <div className="game-board__round-info">
          <span className="game-board__round-text">
            {completedRounds} / {roundCount}판
          </span>
          <div className="game-board__round-progress">
            {Array.from({ length: roundCount }, (_, i) => (
              <div
                key={i}
                className={`game-board__round-dot ${
                  i < completedRounds
                    ? "game-board__round-dot--completed"
                    : i === completedRounds
                      ? "game-board__round-dot--current"
                      : ""
                }`}
              />
            ))}
          </div>
        </div>
        {/* 현재 누적 점수 */}
        <div className="game-board__current-score">
          <span className="game-board__score-value">{totalPoints}</span>
          <span className="game-board__score-max">/ {roundCount * 3}점</span>
        </div>
      </div>

      {/* 이번 라운드 획득 점수 피드백 */}
      {lastEarnedPoints !== null && (
        <div className={`game-board__points-feedback game-board__points-feedback--${currentRound?.result ?? ""}`}>
          {lastEarnedPoints > 0 ? `+${lastEarnedPoints}점` : "0점"}
        </div>
      )}

      {/* 결과 표시 영역 */}
      <ResultDisplay currentRound={currentRound} isAnimating={isAnimating} />

      {/* 선택 버튼들 */}
      <div className="game-board__choices">
        {CHOICES.map((choice) => (
          <ChoiceButton key={choice} choice={choice} onSelect={play} disabled={isAnimating} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
