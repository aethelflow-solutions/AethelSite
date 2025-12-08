import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                paddingY: 1,
            }}
        >
            <Toolbar className="flex items-center justify-between">

                {/* LOGO - LEFT */}
                <div className="flex items-center">
                    <img
                        src="aethel-logo (2).png" 
                        alt="Logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* MENU - CENTER */}
                <div className="hidden md:flex gap-10 items-center text-black mx-auto">
                    <Button sx={{ color: "#000", textTransform: "none", fontSize: "16px" }}>Home</Button>
                    <Button sx={{ color: "#000", textTransform: "none", fontSize: "16px" }}>Services</Button>
                    <Button sx={{ color: "#000", textTransform: "none", fontSize: "16px" }}>Use Cases</Button>
                    <Button sx={{ color: "#000", textTransform: "none", fontSize: "16px" }}>Contact</Button>
                </div>

                {/* ENQUIRE NOW BUTTON - RIGHT */}
                <div className="hidden md:flex">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#3B82F6",
                            color: "white",
                            paddingX: 3,
                            paddingY: 1,
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": { backgroundColor: "#2563EB" },
                        }}
                    >
                        Enquire Now
                    </Button>
                </div>

                {/* MOBILE MENU */}
                <div className="md:hidden">
                    <IconButton sx={{ color: "#000" }}>
                        <MenuIcon />
                    </IconButton>
                </div>

            </Toolbar>
        </AppBar>
    );
}
