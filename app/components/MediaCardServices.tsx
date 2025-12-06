import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CardData } from "../data/data";
import { ArrowRight } from "lucide-react";
import AnimatedContent from '../utils/AnimatedContent'
import AButton from "./AButton";

interface MediaCardProps {
    data: CardData;
}

export default function MediaCardServices({ data }: MediaCardProps) {
    const hasButton = data.showButton !== false;
    return (
        <>
            <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                duration={1.2}
                ease="bounce.out"
                initialOpacity={0.1}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                delay={0.3}
            >
                {/* Card using the SVG clipPath */}
                <Card
                    className=""
                    sx={{
                        maxWidth: 380,
                        bgcolor: "#0D0D0D",
                        color: "white",
                        borderRadius: "32px",
                        padding: "32px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        boxShadow: "none",
                        position: "relative",
                        overflow: "visible",
                        transition: 'background-color 0.25s ease, transform 0.25s ease',
                        '&:hover': {
                            bgcolor: '#000000',
                        },
                        "&:hover .text-block": {
                            transform: "translateY(-12px)",
                        },
                        "& .text-block": {
                            transition: 'transform 0.28s ease',
                        },
                        "& .cta-button": {
                            opacity: 0,
                            visibility: 'hidden',
                            transform: 'translateY(10px)',
                            transition: 'opacity 0.28s ease, transform 0.28s ease, visibility 0s linear 0.28s',
                        },
                        "&:hover .cta-button": {
                            opacity: 1,
                            transform: "translateY(0)",
                            visibility: 'visible',
                            transitionDelay: '0s',
                        },
                    }}>

                    {/* Icon */}
                    <Box
                        component="img"
                        src={data.icon}
                        alt={data.title}
                        sx={{ width: 64, height: 64 }}
                    />
                    <Box
                        className="text-block"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                            mt: 2,
                        }}
                    >
                        {/* Title */}
                        <Typography variant="h5" fontWeight={600}>
                            {data.title}
                        </Typography>

                        {/* Description */}
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            {data.description}
                        </Typography>
                    </Box>

                    {/* CTA Button */}
                    {hasButton && <AButton
                        variant="contained"
                        disableElevation
                        className="cta-button"
                        sx={{
                            mt: 2,
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "50px",
                            paddingX: 3,
                            paddingY: 1.2,
                            textTransform: "none",
                            fontWeight: 600,
                            alignSelf: "flex-start",
                            "&:hover": { backgroundColor: "#eaeaea" },
                        }}
                    >
                        Explore More <ArrowRight size={18} />
                    </AButton>}
                </Card >
            </AnimatedContent>
        </>
    );
}
