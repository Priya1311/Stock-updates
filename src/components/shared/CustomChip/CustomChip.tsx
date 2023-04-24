/*
 * File: CustomChip.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:02:20 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import Chip from '@mui/material/Chip';
import { ChipData } from './ChipData';

interface Props {
  selectedChips: string[];
  onSelectChip: (label: string) => void;
  onDeselectChip: (label: string) => void;
  marketType: string;
}

const CustomChips = (props: Props) => {
  const { selectedChips, onSelectChip, onDeselectChip, marketType } = props;

  const handleChipClick = (label: string) => {
    if (selectedChips.includes(label)) {
      onDeselectChip(label);
    } else {
      onSelectChip(label);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {ChipData[marketType].map((chip: { id: number; label: string }) => (
        <Chip
          variant={selectedChips.includes(chip.label) ? 'filled' : 'outlined'}
          key={chip.id}
          label={chip.label}
          color='primary'
          onClick={() => handleChipClick(chip.label)}
        />
      ))}
    </div>
  );
};

export default CustomChips;
