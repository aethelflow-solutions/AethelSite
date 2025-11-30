import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardData } from "../data/data";

interface MediaCardProps {
    data: CardData;
}

export default function MediaCardMission({ data }: MediaCardProps) {
    const hasButton = data.showButton !== false;
    return (
        <>

            {/* Card using the SVG clipPath */}
            <Card
                elevation={0}
                square
                className=""
                sx={{
                    maxWidth: 600,
                    minHeight: { md:250 },
                    bgcolor: "#0D0D0D",
                    color: "white",
                    borderRadius: "32px",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    boxShadow: "none",
                    // width: '100%'
                    
                }}>
                <div className="grid grid-cols-[1fr_3fr] gap-4 h-full">
                    <div className="flex justify-center items-center " >
                        <Box
                            component="img"
                            src={data.icon}
                            alt={data.title}
                            sx={{ width: 64, height: 64 , minHeight: "100%"}}
                        />
                    </div>
                    <div className="flex justify-center items-center" >
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
                    </div>
                </div>
            </Card >
        </>
    );
}



export function MediaCardMission1({ data }: MediaCardProps) {
    const hasButton = data.showButton !== false;
    return (
        <Card
            elevation={0}
            square
            sx={{
                maxWidth: 520,
                minHeight: { md: 250 },
                bgcolor: "rgba(13, 13, 13, 0.4)", 
                color: "white",
                borderRadius: "32px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                boxShadow: "none",
                // width: '100%',
                // borderBlockColor: 'red',
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',  // Changed from [1fr_3fr]
                    gap: 2,
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                {/* Icon Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        component="img"
                        src={data.icon}
                        alt={data.title}
                        sx={{ width: 64, height: 64 }}
                    />
                </Box>

                {/* Text Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        {data.title}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        {data.description}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}
