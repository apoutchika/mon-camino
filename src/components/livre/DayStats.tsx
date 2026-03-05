import { formatNumber } from "@/lib/formatNumber";
import type { DayStats as DayStatsType } from "@/domain";

interface Props {
  stats: DayStatsType;
  compact?: boolean;
}

const SEP = " ";

export function DayStats({ stats, compact = false }: Props) {
  if (compact) {
    return (
      <div className="day-stats-compact">
        <div className="day-stats-compact__item">
          <span className="day-stats-compact__value">
            {formatNumber(stats.distance, "km", 1)}
          </span>
          <span className="day-stats-compact__label">Distance</span>
        </div>
        <div className="day-stats-compact__item">
          <span className="day-stats-compact__value">
            {formatNumber(stats.elevationGain, "m", 0)}
          </span>
          <span className="day-stats-compact__label">D+</span>
        </div>
        <div className="day-stats-compact__item">
          <span className="day-stats-compact__value">
            {formatNumber(stats.elevationLoss, "m", 0)}
          </span>
          <span className="day-stats-compact__label">D-</span>
        </div>
      </div>
    );
  }

  return (
    <div className="day-stats">
      <div className="day-stats__item">
        <span className="day-stats__value">
          {formatNumber(stats.distance, "km", 1)}
        </span>
        <span className="day-stats__label">Distance du jour</span>
        {stats.totalDistance !== undefined && (
          <span className="day-stats__sublabel">
            {formatNumber(stats.totalDistance, "km", 0)}
            {SEP}total
          </span>
        )}
      </div>

      <div className="day-stats__item">
        <span className="day-stats__value">
          {formatNumber(stats.elevationGain, "m", 0)}
        </span>
        <span className="day-stats__label">Dénivelé positif</span>
        {stats.totalElevationGain !== undefined && (
          <span className="day-stats__sublabel">
            {formatNumber(stats.totalElevationGain, "m", 0)} total
          </span>
        )}
      </div>

      <div className="day-stats__item">
        <span className="day-stats__value">
          {formatNumber(stats.elevationLoss, "m", 0)}
        </span>
        <span className="day-stats__label">Dénivelé négatif</span>
        {stats.totalElevationGain !== undefined && (
          <span className="day-stats__sublabel">
            {formatNumber(stats.totalElevationLoss, "m", 0)} total
          </span>
        )}
      </div>
    </div>
  );
}
