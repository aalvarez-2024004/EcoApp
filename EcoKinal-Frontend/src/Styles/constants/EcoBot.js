export const ecoBotCss = `
  .ecobot-wrap {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }

  .ecobot-fab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px 0 16px;
    height: 52px;
    background: linear-gradient(135deg, #1b3c1a 0%, #2d5a27 100%);
    color: white;
    border: none;
    border-radius: 100px;
    font-size: 15px;
    font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(27, 60, 26, 0.4);
    transition: all 0.2s ease;
  }

  .ecobot-fab i { font-size: 20px; }
  .ecobot-fab:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(27, 60, 26, 0.5); }

  .ecobot-window {
    width: 360px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 24px 56px rgba(0,0,0,0.18), 0 0 0 1px rgba(45,90,39,0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: ecobotSlideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes ecobotSlideIn {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .ecobot-header {
    background: linear-gradient(135deg, #1b3c1a 0%, #2d5a27 100%);
    padding: 16px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ecobot-header-left {
    display: flex; align-items: center; gap: 10px;
  }

  .ecobot-avatar-sm {
    width: 36px; height: 36px; border-radius: 10px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 18px;
  }

  .ecobot-header-name {
    color: white; font-weight: 700; font-size: 14px; margin: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .ecobot-header-sub {
    color: rgba(255,255,255,0.6); font-size: 11px; margin: 0;
  }

  .ecobot-close-btn {
    background: rgba(255,255,255,0.12); border: none;
    width: 30px; height: 30px; border-radius: 8px;
    color: white; font-size: 16px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }

  .ecobot-close-btn:hover { background: rgba(255,255,255,0.22); }

  .ecobot-messages {
    flex: 1;
    max-height: 340px;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f8f9f2;
  }

  .ecobot-msg {
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 13.5px;
    line-height: 1.55;
    font-family: 'Plus Jakarta Sans', sans-serif;
    white-space: pre-wrap;
  }

  .ecobot-msg--bot {
    background: white;
    color: #1a2e1a;
    border: 1px solid rgba(45,90,39,0.1);
    border-bottom-left-radius: 4px;
    align-self: flex-start;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .ecobot-msg--user {
    background: linear-gradient(135deg, #1b3c1a, #2d5a27);
    color: white;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  }

  .ecobot-typing {
    display: flex; align-items: center; gap: 5px; padding: 12px 16px;
  }

  .ecobot-typing span {
    width: 7px; height: 7px; border-radius: 50%;
    background: #2d5a27;
    animation: ecoBotDot 1.2s infinite ease-in-out;
  }

  .ecobot-typing span:nth-child(1) { animation-delay: 0s; }
  .ecobot-typing span:nth-child(2) { animation-delay: 0.2s; }
  .ecobot-typing span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes ecoBotDot {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
    40% { transform: scale(1.2); opacity: 1; }
  }

  .ecobot-input-row {
    padding: 12px 14px;
    border-top: 1px solid rgba(45,90,39,0.08);
    display: flex; gap: 8px; align-items: center;
    background: white;
  }

  .ecobot-input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid rgba(45,90,39,0.18);
    border-radius: 12px;
    font-size: 13.5px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none;
    color: #1a2e1a;
    background: #f8f9f2;
    transition: border-color 0.15s;
  }

  .ecobot-input:focus { border-color: #2d5a27; }

  .ecobot-send-btn {
    width: 40px; height: 40px; border-radius: 11px;
    background: linear-gradient(135deg, #1b3c1a, #2d5a27);
    border: none; color: white; font-size: 17px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: opacity 0.15s;
    flex-shrink: 0;
  }

  .ecobot-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .ecobot-send-btn:not(:disabled):hover { opacity: 0.88; }

  @media (max-width: 768px) {
    .ecobot-window { width: calc(100vw - 32px); }
    .ecobot-wrap { bottom: 16px; right: 16px; }
  }
`