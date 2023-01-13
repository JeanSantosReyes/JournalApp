import { TurnedInNot } from "@mui/icons-material"
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from "@mui/material"

export const SideBar = ({ drawerWidth = 240 }) => {
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >

            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        Jean Santos
                    </Typography>
                </Toolbar>

                <Divider />

                <List>
                    {
                        ['Enero', 'Febrero', 'Marzo'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={text} />
                                        <ListItemText secondary={'Lorem ipsum dolor sit amet'} />
                                    </Grid>

                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>

        </Box >
    )
}
