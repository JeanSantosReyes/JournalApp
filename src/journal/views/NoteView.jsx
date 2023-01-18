import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm"
import { clearActive, setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import { ImageGallery } from "../components"

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving, status } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    // Cerrar NoteView al presionar ESC
    useEffect(() => {
        const keyDownHandler = event => {
            // Limpiar nota activa
            if (event.key === 'Escape') dispatch(clearActive());
        };
        // Añadir Evento Listener al abrir NoteView
        document.addEventListener('keydown', keyDownHandler);
        // Limpiar y Eliminar Evento Listener
        return () => document.removeEventListener('keydown', keyDownHandler);
        // eslint-disable-next-line
    }, []);

    // Actualizar nota actual
    useEffect(() => {
        dispatch(setActiveNote(formState));
        // eslint-disable-next-line
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire(
                `Nota ${messageSaved}a`,
                `${title} ha sido ${messageSaved}o correctamente`,
                'success');
        }
        // eslint-disable-next-line
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: `Estás apunto de eliminar la nota: ${title}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar ahora!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    `${title} ha sido eliminado.`,
                    'success'
                )
                // Eliminar nota
                dispatch(startDeletingNote());
            } else {
                Swal.fire(`${title} No se ha eliminado`);
            }
        });

    }

    return (
        <Grid className="animate__animated animate__fadeIn animate_faster" container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>

                <input
                    type='file'
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    color='primary'
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    {
                        (status === 'new')
                            ? 'Guardar'
                            : 'Actualizar'
                    }
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué sucedió en el día de hoy?'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar Nota
                </Button>
            </Grid>

            {/* Galeria de imagenes */}
            <ImageGallery images={note.imageUrls} />
        </Grid >
    )
}
