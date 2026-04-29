"use client";

import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";

export type PayToken = "USDC" | "ETH";

export function PayTokenDropdown({
  value,
  onChange,
}: Readonly<{ value: PayToken; onChange: (v: PayToken) => void }>) {
  const handleChange = (e: SelectChangeEvent<PayToken>) => {
    onChange(e.target.value);
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
        fontWeight: 600,
        fontSize: 15,
        minWidth: 84,
        "& .MuiSelect-select": { py: 0.5, pr: "24px !important" },
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
      <MenuItem value="USDC">USDC</MenuItem>
      <MenuItem value="ETH">ETH</MenuItem>
    </Select>
  );
}
