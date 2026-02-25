import { useState, useCallback } from "react";
import type { RankingEntry, ScoreState, RoundCount } from "../types/game";
import { RANKING_MAX_SIZE } from "../types/game";

/** localStorage 저장 키 */
const STORAGE_KEY = "rps-game-ranking";

/**
 * localStorage에서 랭킹 데이터를 불러오는 순수 함수
 * 파싱 실패 시 빈 배열 반환
 */
const loadRankingFromStorage = (): RankingEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    // 기본 타입 가드
    if (!Array.isArray(parsed)) return [];
    return parsed as RankingEntry[];
  } catch {
    return [];
  }
};

/**
 * localStorage에 랭킹 데이터를 저장하는 함수
 * @param entries - 저장할 랭킹 배열
 */
const saveRankingToStorage = (entries: RankingEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage 쓰기 실패 시 무시 (Private 모드 등)
  }
};

/**
 * 점수 내림차순, 동점이면 날짜 내림차순으로 정렬하는 비교 함수
 */
const compareRankingEntries = (a: RankingEntry, b: RankingEntry): number => {
  if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};

/**
 * 랭킹 CRUD를 관리하는 커스텀 훅
 * localStorage를 영구 저장소로 사용
 */
export const useRanking = () => {
  const [rankings, setRankings] = useState<RankingEntry[]>(() => loadRankingFromStorage().sort(compareRankingEntries));

  /**
   * 새 랭킹 항목 추가
   * @param playerName - 플레이어 이름
   * @param totalPoints - 획득 점수
   * @param roundCount - 플레이한 판 수
   * @param score - 승/패/무 카운트
   * @returns 추가된 항목의 ID
   */
  const addRanking = useCallback(
    (playerName: string, totalPoints: number, roundCount: RoundCount, score: ScoreState): string => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const entry: RankingEntry = {
        id,
        playerName: playerName.trim() || "익명",
        totalPoints,
        roundCount,
        score,
        createdAt: new Date().toISOString(),
      };

      setRankings((prev) => {
        // 추가 후 정렬하고 최대 개수 제한
        const updated = [...prev, entry].sort(compareRankingEntries).slice(0, RANKING_MAX_SIZE);
        saveRankingToStorage(updated);
        return updated;
      });

      return id;
    },
    [],
  );

  /** 전체 랭킹 초기화 */
  const clearRanking = useCallback((): void => {
    setRankings([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // 무시
    }
  }, []);

  /**
   * 특정 ID의 랭킹에서 순위 계산 (1부터 시작)
   * @param id - 조회할 항목의 ID
   * @returns 순위 (없으면 null)
   */
  const getRankOf = useCallback(
    (id: string): number | null => {
      const index = rankings.findIndex((entry) => entry.id === id);
      return index === -1 ? null : index + 1;
    },
    [rankings],
  );

  return {
    rankings,
    addRanking,
    clearRanking,
    getRankOf,
  } as const;
};
