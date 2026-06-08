@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --coral: #D85A30;
  --coral-light: #FAECE7;
  --coral-mid: #993C1D;
  --bg: #FAFAF8;
  --bg-card: #FFFFFF;
  --bg-secondary: #F4F3F0;
  --text-primary: #1A1916;
  --text-secondary: #6B6A66;
  --text-tertiary: #9B9A96;
  --border: rgba(26, 25, 22, 0.1);
  --border-strong: rgba(26, 25, 22, 0.18);
  --info-bg: #EFF6FF;
  --info-text: #1D4ED8;
  --radius: 10px;
  --radius-sm: 6px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #141412;
    --bg-card: #1E1D1A;
    --bg-secondary: #252420;
    --text-primary: #F0EFE8;
    --text-secondary: #A8A79F;
    --text-tertiary: #6B6A63;
    --border: rgba(240, 239, 232, 0.1);
    --border-strong: rgba(240, 239, 232, 0.18);
    --info-bg: #1E2D3D;
    --info-text: #93C5FD;
    --coral-light: #3A1F14;
  }
}

html, body {
  font-family: 'DM Sans', -apple-system, sans-serif;
  background-color: var(--bg);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

textarea, input, button {
  font-family: 'DM Sans', sans-serif;
}
