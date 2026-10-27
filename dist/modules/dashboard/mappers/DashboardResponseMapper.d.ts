/**
 * -----------------------------------------------------------------------------
 * File: DashboardResponseMapper.ts
 * Module: Dashboard
 *
 * Purpose:
 * Maps dashboard business models into public API DTOs.
 * -----------------------------------------------------------------------------
 */
import type { DashboardResponseDto } from "../dto/DashboardResponseDto.js";
import type { Dashboard } from "../models/Dashboard.js";
export declare class DashboardResponseMapper {
    toDto(dashboard: Dashboard): DashboardResponseDto;
}
