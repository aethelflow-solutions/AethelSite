import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    return (
        <AppBar
            position="absolute"   // NOW OVER BACKGROUND IMAGE
            elevation={0}
            sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                paddingY: 1,
                top: 0,
                left: 0,
                right: 0,
                marginTop: "18px", // SMALL SPACE FROM TOP
            }}
        >
            <Toolbar className="flex items-center justify-between">

                {/* LOGO - Slight Transparency but Not Too Much */}
                <div className="flex items-center bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-xl">
                    <img
                        src="/aethel-logo.webp"
                        alt="Aethel Logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* MENU */}
                <div className="hidden md:flex gap-10 items-center mx-auto">
                    {["Home", "Services", "Use Cases", "Contact"].map((item) => (
                        <Button
                            key={item}
                            sx={{
                                color: "#fff",
                                textTransform: "none",
                                fontSize: "16px",
                                borderRadius: "10px",
                                transition: "0.2s",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.25)",
                                },
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </div>

                {/* ENQUIRE NOW BUTTON */}
                {/* ENQUIRE NOW BUTTON */}
<div className="hidden md:flex">
    <Button
        variant="outlined"
        sx={{
            borderColor: "white",
            color: "white",
            paddingX: 2.2,        // smaller width
            paddingY: 0.6,        // smaller height
            fontSize: "14px",     // smaller text
            borderRadius: "22px", // balanced rounded
            marginRight: "12px",  // ADDED RIGHT MARGIN
            textTransform: "none",
            fontWeight: 500,
            backgroundColor: "transparent",
            "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
                borderColor: "white",
            },
        }}
    >
        Enquire Now
    </Button>
</div>


                {/* MOBILE MENU */}
                <div className="md:hidden">
                    <IconButton sx={{ color: "#fff" }}>
                        <MenuIcon />
                    </IconButton>
                </div>

            </Toolbar>
        </AppBar>
    );
}
