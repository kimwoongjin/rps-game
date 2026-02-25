import { useState } from "react";
import type { RoundCount } from "../types/game";
import { ROUND_COUNT_OPTIONS } from "../types/game";

/** GameSetup 컴포넌트의 Props */
interface GameSetupProps {
  /** 게임 시작 핸들러 */
  readonly onStart: (roundCount: RoundCount) => void;
  /** 랭킹 보기 버튼 핸들러 */
  readonly onShowRanking: () => void;
}

/**
 * 게임 시작 전 설정 화면
 * 플레이할 판 수를 선택하고 게임을 시작
 */
const GameSetup = ({ onStart, onShowRanking }: GameSetupProps) => {
  const [selectedCount, setSelectedCount] = useState<RoundCount>(5);

  /** 시작 버튼 클릭 핸들러 */
  const handleStart = () => {
    onStart(selectedCount);
  };

  return (
    <div className="game-setup">
      {/* 타이틀 */}
      <h1 className="game-setup__title">
        <span className="game-setup__title-emoji">✊✌️🖐️</span>
        <span>가위바위보</span>
      </h1>

      {/* 판 수 선택 */}
      <div className="game-setup__section">
        <h2 className="game-setup__section-title">판 수를 선택하세요</h2>
        <div className="game-setup__round-options">
          {ROUND_COUNT_OPTIONS.map((count) => (
            <button
              key={count}
              className={`game-setup__round-option ${
                selectedCount === count ? "game-setup__round-option--selected" : ""
              }`}
              onClick={() => setSelectedCount(count)}
              type="button"
              aria-pressed={selectedCount === count}
              aria-label={`${count}판 선택`}
            >
              <span className="game-setup__round-number">{count}판</span>
              {/* 최대 획득 가능 점수 표시 */}
              <span className="game-setup__round-max-score">최대 {count * 3}점</span>
            </button>
          ))}
        </div>
      </div>

      {/* 점수 시스템 안내 */}
      <div className="game-setup__scoring-guide">
        <h3 className="game-setup__guide-title">점수 시스템</h3>
        <div className="game-setup__guide-items">
          <div className="game-setup__guide-item">
            <span className="game-setup__guide-emoji">🎉</span>
            <span className="game-setup__guide-label">승리</span>
            <span className="game-setup__guide-points game-setup__guide-points--win">+3점</span>
          </div>
          <div className="game-setup__guide-item">
            <span className="game-setup__guide-emoji">🤝</span>
            <span className="game-setup__guide-label">무승부</span>
            <span className="game-setup__guide-points game-setup__guide-points--draw">+1점</span>
          </div>
          <div className="game-setup__guide-item">
            <span className="game-setup__guide-emoji">😢</span>
            <span className="game-setup__guide-label">패배</span>
            <span className="game-setup__guide-points game-setup__guide-points--lose">+0점</span>
          </div>
        </div>
      </div>

      {/* 시작 버튼 */}
      <button
        className="game-setup__start-button"
        onClick={handleStart}
        type="button"
        aria-label={`${selectedCount}판 게임 시작`}
      >
        게임 시작
      </button>

      {/* 랭킹 보기 */}
      <button className="game-setup__ranking-button" onClick={onShowRanking} type="button">
        🏆 랭킹 보기
      </button>
    </div>
  );
};

export default GameSetup;
