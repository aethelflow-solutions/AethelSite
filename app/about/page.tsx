import type { Metadata } from "next";
import { Box } from "@mui/material";
import MediaCard from "../components/MediaCardServices";
import { aboutCardsData } from "../data/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Aethel Flow's mission to empower businesses with AI and automation solutions.",
};

export default function About() {
  return (
    <main className="flex justify-around items-center flex-wrap gap-4 bg-gray-100 p-10 min-h-screen">
      {aboutCardsData.map((card) => (
        <Box
          key={card.id}
          sx={{ display: "flex", justifyContent: "center", gap: 2, mx: 2 }}
        >
          <MediaCard data={card} />
        </Box>
      ))}
    </main>
  );
}
