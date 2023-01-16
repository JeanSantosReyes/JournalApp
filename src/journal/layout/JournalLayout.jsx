import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";


const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate_faster">

            {/* Navbar */}
            <NavBar drawerWidth={drawerWidth} />

            {/* Sidebar */}
            <SideBar drawerWidth={drawerWidth} />

            < Box
                component='main'
                sx={{ flexGrow: 1, p: 2 }}
            >
                {/* Toolbar */}

                <Toolbar />

                {children}

            </Box>
        </Box >
    )
}
