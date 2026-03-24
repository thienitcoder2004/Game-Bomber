export const GAME_CONFIG = {
  info: {
    projectName: "Client Game Bomber",
    note: "Chỉnh các thông số game chính ở đây để đỡ sửa nhiều file.",
  },

  network: {
    apiBaseUrl:
      (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
      "http://localhost:8080",

    wsBaseUrl:
      (import.meta.env.VITE_WS_BASE_URL as string | undefined)?.trim() ||
      "ws://localhost:8080",

    ngrokSkipBrowserWarningHeaderValue: "1",
  },

  room: {
    defaultRequiredPlayers: 4,
    allowedRoomSizes: [2, 3, 4] as number[],
  },

  board: {
    rows: 13,
    cols: 15,
    tileSize: 56,
    hudHeight: 78,
  },

  player: {
    startLives: 3,
    startMaxBombs: 1,
    startBombRange: 1,
    startSpeedLevel: 1,
    maxInventorySlots: 5,
    maxBombs: 5,
    maxBombRange: 5,
    maxSpeedLevel: 5,
    maxLives: 5,
    shieldDurationMs: 5000,
  },

  timing: {
    keyGapMaxMs: 3000,
    shakeMs: 100,
    bombFuseMs: 1000,
    explosionMs: 360,
    invulnerableMs: 1400,

    moveCooldownBySpeedLevel: {
      1: 160,
      2: 135,
      3: 110,
      4: 90,
      5: 75,
    } as Record<number, number>,
  },
} as const;

export const getMoveCooldownBySpeedLevel = (speedLevel?: number) => {
  const level = Number(speedLevel ?? GAME_CONFIG.player.startSpeedLevel);
  return (
    GAME_CONFIG.timing.moveCooldownBySpeedLevel[level] ??
    GAME_CONFIG.timing.moveCooldownBySpeedLevel[
      GAME_CONFIG.player.startSpeedLevel
    ]
  );
};

export const getDefaultRoomSize = () => {
  return (
    GAME_CONFIG.room.allowedRoomSizes.find(
      (size) => size === GAME_CONFIG.room.defaultRequiredPlayers,
    ) ?? GAME_CONFIG.room.allowedRoomSizes[0]
  );
};