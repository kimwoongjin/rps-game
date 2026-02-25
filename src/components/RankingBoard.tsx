import type { RankingEntry } from "../types/game";

/** RankingBoard 컴포넌트의 Props */
interface RankingBoardProps {
  readonly rankings: readonly RankingEntry[];
  /** 뒤로가기 핸들러 */
  readonly onBack: () => void;
  /** 랭킹 초기화 핸들러 */
  readonly onClear: () => void;
  /** 방금 등록된 항목의 ID (하이라이트용, 없으면 null) */
  readonly highlightId: string | null;
}

/**
 * 날짜 문자열을 한국어 형식으로 포맷팅하는 순수 함수
 * @param isoString - ISO 8601 날짜 문자열
 * @returns 포맷된 날짜 문자열
 */
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * 순위에 따른 메달 이모지 반환 (1~3위만 메달)
 */
const getRankMedal = (rank: number): string => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `${rank}`;
};

/**
 * 전체 랭킹 목록 화면 컴포넌트
 */
const RankingBoard = ({ rankings, onBack, onClear, highlightId }: RankingBoardProps) => {
  return (
    <div className="ranking-board">
      {/* 헤더 */}
      <div className="ranking-board__header">
        <button className="ranking-board__back-button" onClick={onBack} type="button" aria-label="뒤로가기">
          ← 돌아가기
        </button>
        <h2 className="ranking-board__title">🏆 랭킹</h2>
        {rankings.length > 0 && (
          <button className="ranking-board__clear-button" onClick={onClear} type="button" aria-label="랭킹 초기화">
            초기화
          </button>
        )}
      </div>

      {/* 랭킹 목록 */}
      {rankings.length === 0 ? (
        <div className="ranking-board__empty">
          <span className="ranking-board__empty-emoji">📝</span>
          <span className="ranking-board__empty-text">아직 등록된 기록이 없어요</span>
          <span className="ranking-board__empty-sub">게임을 완료하고 첫 기록을 남겨보세요!</span>
        </div>
      ) : (
        <ol className="ranking-board__list">
          {rankings.map((entry, index) => {
            const rank = index + 1;
            const isHighlighted = entry.id === highlightId;

            return (
              <li
                key={entry.id}
                className={`ranking-board__item ${isHighlighted ? "ranking-board__item--highlighted" : ""}`}
              >
                {/* 순위 */}
                <span className="ranking-board__rank">{getRankMedal(rank)}</span>

                {/* 플레이어 정보 */}
                <div className="ranking-board__player-info">
                  <span className="ranking-board__player-name">{entry.playerName}</span>
                  <div className="ranking-board__meta">
                    <span className="ranking-board__meta-item">{entry.roundCount}판</span>
                    <span className="ranking-board__meta-divider">·</span>
                    <span className="ranking-board__meta-item">
                      {entry.score.win}승 {entry.score.draw}무 {entry.score.lose}패
                    </span>
                    <span className="ranking-board__meta-divider">·</span>
                    <span className="ranking-board__meta-item">{formatDate(entry.createdAt)}</span>
                  </div>
                </div>

                {/* 점수 */}
                <div className="ranking-board__score">
                  <span className="ranking-board__points">{entry.totalPoints}</span>
                  <span className="ranking-board__points-unit">점</span>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default RankingBoard;
