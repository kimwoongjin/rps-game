import type { ScoreState } from "../types/game";

/** ScoreBoard 컴포넌트의 Props */
interface ScoreBoardProps {
  /** 현재 스코어 상태 */
  readonly score: ScoreState;
  /** 리셋 버튼 핸들러 */
  readonly onReset: () => void;
}

/**
 * 승/패/무 카운트를 표시하는 스코어보드 컴포넌트
 * 리셋 버튼 포함
 */
const ScoreBoard = ({ score, onReset }: ScoreBoardProps) => {
  /** 총 게임 수 계산 */
  const totalGames = score.win + score.lose + score.draw;

  return (
    <div className="scoreboard">
      <h2 className="scoreboard__title">전적</h2>
      <div className="scoreboard__stats">
        <div className="scoreboard__stat scoreboard__stat--win">
          <span className="scoreboard__stat-label">승</span>
          <span className="scoreboard__stat-value">{score.win}</span>
        </div>
        <div className="scoreboard__stat scoreboard__stat--draw">
          <span className="scoreboard__stat-label">무</span>
          <span className="scoreboard__stat-value">{score.draw}</span>
        </div>
        <div className="scoreboard__stat scoreboard__stat--lose">
          <span className="scoreboard__stat-label">패</span>
          <span className="scoreboard__stat-value">{score.lose}</span>
        </div>
      </div>
      <div className="scoreboard__footer">
        <span className="scoreboard__total">총 {totalGames}전</span>
        {totalGames > 0 && (
          <button className="scoreboard__reset-button" onClick={onReset} type="button" aria-label="전적 초기화">
            초기화
          </button>
        )}
      </div>
    </div>
  );
};

export default ScoreBoard;
