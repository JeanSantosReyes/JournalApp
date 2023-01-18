import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const { status } = useSelector(state => state.journal);

    // El titulo no debe ser mayor a 17 caracteres
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title]);

    // El Body no debe ser mayor a 40 caracteres
    const newBody = useMemo(() => {
        return body.length > 40
            ? body.substring(0, 40) + '...'
            : body;
    }, [body]);

    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote} disabled={status === 'new'}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={newBody} />
                </Grid>

            </ListItemButton>
        </ListItem>
    )
}
