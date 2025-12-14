import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardData } from "../data/data";

interface MediaCardProps {
  data: CardData;
}

export function MediaCardMission1({ data }: MediaCardProps) {
  return (
    <Card
      elevation={0}
      square
      sx={{
        maxWidth: 440, // slightly smaller
        minHeight: 160,
        bgcolor: "rgba(101,101,101,0.35)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "white",
        borderRadius: "28px",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 3,
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={data.icon}
            alt={data.title}
            sx={{ width: 50, height: 50 }}
          />
        </Box>

        {/* Text */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            {data.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {data.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
