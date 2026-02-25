import type { Choice } from "../types/game";
import { CHOICE_EMOJI, CHOICE_LABEL } from "../types/game";

/** ChoiceButton 컴포넌트의 Props */
interface ChoiceButtonProps {
  /** 선택지 종류 */
  readonly choice: Choice;
  /** 클릭 핸들러 */
  readonly onSelect: (choice: Choice) => void;
  /** 비활성화 여부 (애니메이션 중) */
  readonly disabled: boolean;
}

/**
 * 가위/바위/보 선택 버튼 컴포넌트
 * 이모지와 한글 라벨을 함께 표시
 */
const ChoiceButton = ({ choice, onSelect, disabled }: ChoiceButtonProps) => {
  /** 버튼 클릭 핸들러 */
  const handleClick = () => {
    onSelect(choice);
  };

  return (
    <button
      className={`choice-button ${disabled ? "choice-button--disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`${CHOICE_LABEL[choice]} 선택`}
      type="button"
    >
      <span className="choice-button__emoji" role="img" aria-hidden="true">
        {CHOICE_EMOJI[choice]}
      </span>
      <span className="choice-button__label">{CHOICE_LABEL[choice]}</span>
    </button>
  );
};

export default ChoiceButton;
