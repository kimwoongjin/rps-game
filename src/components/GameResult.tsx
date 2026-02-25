import { useState } from "react";
import type { ScoreState, RoundCount } from "../types/game";

/** GameResult 컴포넌트의 Props */
interface GameResultProps {
  /** 최종 점수 */
  readonly totalPoints: number;
  /** 플레이한 판 수 */
  readonly roundCount: RoundCount;
  /** 승/패/무 카운트 */
  readonly score: ScoreState;
  /** 랭킹 등록 핸들러 */
  readonly onRegisterRanking: (playerName: string) => void;
  /** 다시하기 핸들러 */
  readonly onRestart: () => void;
}

/**
 * 게임 완료 후 최종 결과 및 랭킹 등록 화면
 * 점수를 보여주고 플레이어 이름을 입력받아 랭킹 등록
 */
const GameResult = ({ totalPoints, roundCount, score, onRegisterRanking, onRestart }: GameResultProps) => {
  const [playerName, setPlayerName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  /** 최대 획득 가능 점수 */
  const maxPoints = roundCount * 3;

  /** 달성률 계산 */
  const achievementRate = Math.round((totalPoints / maxPoints) * 100);

  /** 달성률에 따른 등급 결정 */
  const getGrade = (): { emoji: string; label: string } => {
    if (achievementRate >= 90) return { emoji: "👑", label: "전설" };
    if (achievementRate >= 70) return { emoji: "💎", label: "다이아" };
    if (achievementRate >= 50) return { emoji: "🥇", label: "골드" };
    if (achievementRate >= 30) return { emoji: "🥈", label: "실버" };
    return { emoji: "🥉", label: "브론즈" };
  };

  const grade = getGrade();

  /** 랭킹 등록 처리 */
  const handleRegister = () => {
    if (isRegistered) return;
    onRegisterRanking(playerName);
    setIsRegistered(true);
  };

  /** 엔터 키 처리 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="game-result">
      {/* 등급 배지 */}
      <div className="game-result__grade">
        <span className="game-result__grade-emoji">{grade.emoji}</span>
        <span className="game-result__grade-label">{grade.label}</span>
      </div>

      {/* 최종 점수 */}
      <div className="game-result__score-section">
        <span className="game-result__score-label">최종 점수</span>
        <div className="game-result__score-value">
          <span className="game-result__points">{totalPoints}</span>
          <span className="game-result__max-points">/ {maxPoints}점</span>
        </div>
        <div className="game-result__progress-bar">
          <div
            className="game-result__progress-fill"
            style={{ width: `${achievementRate}%` }}
            aria-label={`달성률 ${achievementRate}%`}
          />
        </div>
        <span className="game-result__achievement-rate">{achievementRate}% 달성</span>
      </div>

      {/* 전적 요약 */}
      <div className="game-result__summary">
        <div className="game-result__summary-item game-result__summary-item--win">
          <span className="game-result__summary-label">승</span>
          <span className="game-result__summary-value">{score.win}</span>
          <span className="game-result__summary-points">{score.win * 3}점</span>
        </div>
        <div className="game-result__summary-item game-result__summary-item--draw">
          <span className="game-result__summary-label">무</span>
          <span className="game-result__summary-value">{score.draw}</span>
          <span className="game-result__summary-points">{score.draw * 1}점</span>
        </div>
        <div className="game-result__summary-item game-result__summary-item--lose">
          <span className="game-result__summary-label">패</span>
          <span className="game-result__summary-value">{score.lose}</span>
          <span className="game-result__summary-points">0점</span>
        </div>
      </div>

      {/* 랭킹 등록 */}
      {!isRegistered ? (
        <div className="game-result__register">
          <label className="game-result__register-label" htmlFor="player-name">
            랭킹에 등록하시겠어요?
          </label>
          <div className="game-result__register-form">
            <input
              id="player-name"
              className="game-result__name-input"
              type="text"
              placeholder="이름 입력 (최대 10자)"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value.slice(0, 10))}
              onKeyDown={handleKeyDown}
              maxLength={10}
              aria-label="플레이어 이름 입력"
            />
            <button className="game-result__register-button" onClick={handleRegister} type="button">
              등록
            </button>
          </div>
        </div>
      ) : (
        <div className="game-result__registered">
          <span className="game-result__registered-text">🎊 랭킹에 등록되었습니다!</span>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="game-result__actions">
        <button className="game-result__restart-button" onClick={onRestart} type="button">
          다시하기
        </button>
      </div>
    </div>
  );
};

export default GameResult;
