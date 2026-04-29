"use client";

import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";

export type SlippagePct = 0.5 | 1 | 2;

export function SlippageDropdown({
  value,
  onChange,
}: Readonly<{ value: SlippagePct; onChange: (v: SlippagePct) => void }>) {
  const handleChange = (e: SelectChangeEvent<number>) => {
    const next = Number(e.target.value) as SlippagePct;
    onChange(next);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      variant="standard"
      disableUnderline
      sx={{
        color: "#fff",
        fontSize: 14,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 1.5,
        px: 1,
        py: 0.25,
        "& .MuiSelect-select": { py: 0.25, pr: "24px !important" },
        "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.7)" },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: "#151515",
            color: "#fff",
            border: "1px solid #242424",
          },
        },
      }}
    >
      <MenuItem value={0.5}>0.5%</MenuItem>
      <MenuItem value={1}>1%</MenuItem>
      <MenuItem value={2}>2%</MenuItem>
    </Select>
  );
}
