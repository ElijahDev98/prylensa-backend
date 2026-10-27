export interface RecordSearchActivityRequestDto {
  userId?: string;
  query?: string;
}

export interface RecordSearchActivityResponseDto {
  recorded: boolean;
  id?: string;
  query?: string;
  createdAt?: string;
}

export interface SavedSearchDto {
  id: string;
  query: string;
  lastRefreshedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
