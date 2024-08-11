import { useCallback, useEffect, useRef, useState } from 'react';
import './BubbleInput.css';

const BubbleInput = ({
  onChange,
  onSubmit,
  value,
  fillColour,
  strokeColour,
  avatarUrl
}) => {
  const refEditable = useRef(null);
  const refContainer = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const handleKeyDown = e => {
    const { current: elContainer } = refContainer;
    const { current: elEditable } = refEditable;
    if (elContainer === null || elEditable === null) return;

    const { isComposing } = e.nativeEvent;
    if (e.key === 'Enter' && !isComposing) {
      const height = elContainer.clientHeight;
      onSubmit && onSubmit(height, avatarUrl); // Pass avatarUrl to onSubmit
      e.preventDefault();
      setSubmitted(true);
      requestAnimationFrame(() => {
        elEditable.focus();
        elEditable.innerText = '';
        setSubmitted(false);
      });
    }
  };

  const handleBlur = useCallback(() => {
    const { current: elDiv } = refEditable;
    if (elDiv) {
      elDiv.focus();
    }
  }, [refEditable]);

  useEffect(handleBlur, [handleBlur]);

  return (
    <div className="bubble-container">
      <div
        ref={refContainer}
        className={`bubble input ${value.length === 0 ? 'empty' : ''} ${submitted ? 'submitted' : ''}`}
      >
        <div
          ref={refEditable}
          className="bubble-content"
          contentEditable
          style={{ backgroundColor: fillColour, color: strokeColour }}
          spellCheck="false"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onInput={e => onChange(e.currentTarget.innerText)}
        />
      </div>
    </div>
  );
};

export default BubbleInput;
