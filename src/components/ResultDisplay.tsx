import type { RoundResult } from "../types/game";
import { CHOICE_EMOJI, CHOICE_LABEL, RESULT_MESSAGE, RESULT_COLOR_CLASS } from "../types/game";

/** ResultDisplay 컴포넌트의 Props */
interface ResultDisplayProps {
  /** 현재 라운드 결과 (null이면 아직 선택 전) */
  readonly currentRound: RoundResult | null;
  /** 셔플 애니메이션 중 여부 */
  readonly isAnimating: boolean;
}

/**
 * 유저 선택 vs 컴퓨터 선택을 나란히 보여주는 결과 표시 컴포넌트
 * "VS" 레이아웃으로 양쪽에 이모지를 표시
 */
const ResultDisplay = ({ currentRound, isAnimating }: ResultDisplayProps) => {
  /** 컴퓨터 이모지 영역 렌더링 */
  const renderComputerEmoji = () => {
    if (isAnimating) {
      return (
        <span className="result-display__emoji result-display__emoji--shuffle" role="img" aria-label="컴퓨터 선택 중">
          🤔
        </span>
      );
    }

    if (currentRound) {
      return (
        <span
          className="result-display__emoji result-display__emoji--reveal"
          role="img"
          aria-label={CHOICE_LABEL[currentRound.computerChoice]}
        >
          {CHOICE_EMOJI[currentRound.computerChoice]}
        </span>
      );
    }

    return (
      <span className="result-display__emoji" role="img" aria-label="대기 중">
        ❓
      </span>
    );
  };

  /** 유저 이모지 영역 렌더링 */
  const renderPlayerEmoji = () => {
    if (isAnimating) {
      return (
        <span className="result-display__emoji result-display__emoji--pulse" role="img" aria-label="선택 완료">
          ⏳
        </span>
      );
    }

    if (currentRound) {
      return (
        <span
          className="result-display__emoji result-display__emoji--reveal"
          role="img"
          aria-label={CHOICE_LABEL[currentRound.playerChoice]}
        >
          {CHOICE_EMOJI[currentRound.playerChoice]}
        </span>
      );
    }

    return (
      <span className="result-display__emoji" role="img" aria-label="선택 대기">
        ❓
      </span>
    );
  };

  /** 결과 메시지 CSS 클래스 결정 */
  const resultClassName = currentRound
    ? `result-display__message ${RESULT_COLOR_CLASS[currentRound.result]}`
    : "result-display__message";

  return (
    <div className="result-display">
      {/* VS 레이아웃 */}
      <div className="result-display__arena">
        {/* 유저 영역 */}
        <div className="result-display__player">
          <span className="result-display__label">나</span>
          {renderPlayerEmoji()}
        </div>

        {/* VS 구분선 */}
        <div className="result-display__vs">
          <span>VS</span>
        </div>

        {/* 컴퓨터 영역 */}
        <div className="result-display__player">
          <span className="result-display__label">컴퓨터</span>
          {renderComputerEmoji()}
        </div>
      </div>

      {/* 결과 메시지 */}
      <div className={resultClassName}>
        {isAnimating && <span className="result-display__thinking">판정 중...</span>}
        {!isAnimating && currentRound && (
          <span className="result-display__result-text">{RESULT_MESSAGE[currentRound.result]}</span>
        )}
        {!isAnimating && !currentRound && <span className="result-display__guide">아래에서 선택하세요!</span>}
      </div>
    </div>
  );
};

export default ResultDisplay;
