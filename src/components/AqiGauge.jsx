import React from "react";
import { Box, Typography } from "@mui/material";

const AQI_RANGES = [
  { min: 0, max: 50, color: "#55A84F", label: "Good" },
  { min: 50, max: 100, color: "#A3C853", label: "Satisfactory" },
  { min: 100, max: 150, color: "#FFF833", label: "Moderate" },
  { min: 150, max: 200, color: "#F29C33", label: "Poor" },
  { min: 200, max: 300, color: "#E93F33", label: "Very Poor" },
  { min: 300, max: 500, color: "#AF2D24", label: "Severe" },
];

function AqiGauge({ value }) {
  if (value == null) return null;

  const clampedValue = Math.min(Math.max(value, 0), 500);
  const percentage = (clampedValue / 500) * 100;

  const currentRange =
    AQI_RANGES.find((r) => clampedValue >= r.min && clampedValue <= r.max) ||
    AQI_RANGES[AQI_RANGES.length - 1];

  return (
    <Box width="100%" maxWidth={500} mx="auto" pt={6} pb={2} px={2} bgcolor="black">
      
      <Box position="relative" height={50}>
        {/* Floating Tooltip Label (Follows the pointer) */}
        <Box
          position="absolute"
          left={`${percentage}%`}
          bottom={60}
          sx={{
            transform: "translateX(-50%)",
            transition: "left 0.5s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "max-content"
          }}
        >
          <Box
            sx={{
              bgcolor: currentRange.color,
              color: "#000", // Keep text black inside the bright colored bubble for contrast
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: "bold",
              fontSize: "0.75rem",
              boxShadow: "0 2px 8px rgba(255,255,255,0.1)",
              whiteSpace: "nowrap"
            }}
          >
            {currentRange.label}: {clampedValue}
          </Box>
          {/* Small Arrow down */}
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `6px solid ${currentRange.color}`,
            }}
          />
        </Box>

        {/* The Meter Bar */}
        <Box
          display="flex"
          width="100%"
          height={20}
          borderRadius={10}
          overflow="hidden"
          sx={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)" }}
        >
          {AQI_RANGES.map((range, index) => (
            <Box
              key={index}
              width={`${((range.max - range.min) / 500) * 100}%`}
              bgcolor={range.color}
              sx={{ opacity: currentRange.label === range.label ? 1 : 0.4 }} // Lowered opacity for inactive
            />
          ))}
        </Box>

        {/* Pointer Needle */}
        <Box
          position="absolute"
          left={`${percentage}%`}
          top={-5}
          sx={{
            transition: "left 0.5s ease",
            transform: "translateX(-50%)",
            zIndex: 2
          }}
        >
          <Box
            width={4}
            height={30}
            bgcolor="#fff" // Changed pointer to White to be visible on black
            borderRadius={2}
            sx={{ boxShadow: "0 0 4px rgba(0,0,0,0.5)" }}
          />
        </Box>

        {/* Numeric Scale */}
        <Box position="relative" width="100%" mt={1.5}>
          {[0, 100, 200, 300, 400, 500].map((v) => (
            <Typography
              key={v}
              variant="caption"
              sx={{
                position: "absolute",
                left: `${(v / 500) * 100}%`,
                transform: "translateX(-50%)",
                color: "rgba(255, 255, 255, 0.7)", // Light grey/white
                fontWeight: "500"
              }}
            >
              {v}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Legend Grid (Bottom) */}
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(3, 1fr)" 
        gap={1} 
        mt={4}
        sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2 }} // Subtle white line
      >
        {AQI_RANGES.map((r) => (
          <Box key={r.label} display="flex" alignItems="center" gap={1}>
            <Box width={12} height={12} borderRadius="2px" bgcolor={r.color} />
            <Typography 
              sx={{ 
                fontSize: '0.7rem', 
                color: currentRange.label === r.label ? "#fff" : "rgba(255,255,255,0.5)", 
                fontWeight: currentRange.label === r.label ? 'bold' : 'normal' 
              }}
            >
              {r.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default AqiGauge;