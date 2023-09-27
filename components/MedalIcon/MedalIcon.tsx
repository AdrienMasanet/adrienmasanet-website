"use client";

import scssThemeVariables from "../../styles/javascript_variables.module.scss";
import styles from "./MedalIcon.module.scss";
import { MedalRank } from "./types";

type MedalIconProps = {
  rank: MedalRank;
  scale?: number;
};

const MedalIcon = ({ rank, scale = 50 }: MedalIconProps) => {
  const rankColors = {
    [MedalRank.Gold]: scssThemeVariables.scssThemeClGold,
    [MedalRank.Silver]: scssThemeVariables.scssThemeClSilver,
    [MedalRank.Bronze]: scssThemeVariables.scssThemeClBronze,
    [3]: scssThemeVariables.scssThemeClGold,
    [2]: scssThemeVariables.scssThemeClSilver,
    [1]: scssThemeVariables.scssThemeClBronze,
  };

  const color = rankColors[rank];

  return (
    <svg id="Medal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123.84 193.39" width={scale} className={styles.svg}>
      <defs>
        <linearGradient id={`medalGradient-${rank}`} x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor={scssThemeVariables.scssThemeClWhite} />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity=".5" />
        </linearGradient>
      </defs>
      <path id="Star" fill={`url(#medalGradient-${rank})`} d="M64.38,87.09,75.7,110a2.74,2.74,0,0,0,2.06,1.5l25.33,3.68a2.75,2.75,0,0,1,1.52,4.68L86.28,137.75a2.75,2.75,0,0,0-.79,2.42l4.33,25.22a2.74,2.74,0,0,1-4,2.89L63.2,156.37a2.74,2.74,0,0,0-2.55,0L38,168.28a2.74,2.74,0,0,1-4-2.89l4.33-25.22a2.75,2.75,0,0,0-.79-2.42L19.23,119.89a2.75,2.75,0,0,1,1.52-4.68l25.33-3.68a2.74,2.74,0,0,0,2.06-1.5L59.46,87.09A2.74,2.74,0,0,1,64.38,87.09Z" />
      <path id="Medal_coin" fill={`url(#medalGradient-${rank})`} data-name="Medal coin" d="M61.92,73.56a57.92,57.92,0,1,0,57.92,57.92A58,58,0,0,0,61.92,73.56Zm0,107.83a49.92,49.92,0,1,1,49.92-49.91A49.91,49.91,0,0,1,61.92,181.39Z" />
      <polyline id="Left_ribbon" fill={`url(#medalGradient-${rank})`} data-name="Left ribbon" points="74.3 60.5 102.34 4 82.79 4 54.75 60.5" />
      <path fill={`url(#medalGradient-${rank})`} d="M42.93,72.55a16.3,16.3,0,0,1,15-10h7.92a16.28,16.28,0,0,1,15,10c1.61.52,3.18,1.1,4.73,1.74A20.29,20.29,0,0,0,65.88,58.5H58A20.29,20.29,0,0,0,38.2,74.29C39.75,73.65,41.32,73.07,42.93,72.55Z" />
      <path fill={`url(#medalGradient-${rank})`} d="M53,55l6.88-13.85L41.43,4H21.88L48,56.65A24.31,24.31,0,0,1,53,55Z" />
    </svg>
  );
};

export default MedalIcon;
