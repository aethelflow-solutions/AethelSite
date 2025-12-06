"use client";
import { Box } from "@mui/material";
import MediaCard from "../components/MediaCardServices";
import { aboutCardsData } from "../data/data";

export default function About() {
    return (
        <div style={{ display: "flex", justifyContent: "space-around", gap: "16px", alignItems: "center", flexWrap: "wrap", backgroundColor: "#f5f5f5", padding: "40px", minHeight: "100vh" }}>
            {aboutCardsData.map((card) => (
                <Box key={card.id} mx={2} sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                    <MediaCard data={card} />
                </Box>
            ))}
        </div>
    );
}
