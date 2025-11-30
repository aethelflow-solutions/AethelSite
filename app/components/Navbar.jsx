import { AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                // display: "flex",
                // justifyItems: "center"
            }}
        >
            <Toolbar className="flex items-center">
                {/* Logo */}
                <Typography variant="h6" className="font-semibold">
                    Aethal Flow
                </Typography>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Services</Button>
                    <Button color="inherit">Use Cases</Button>
                    <Button color="inherit">Contact</Button>

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            paddingX: 3,
                        }}
                    >
                        Enquire Now
                    </Button>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}
