
// getState tiene toda la informacion del store

import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        // Obtener uid generado por firebase del usuario conectado
        const { uid } = getState().auth;

        // Objeto de la nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        // Path de firebase donde se guardara los datos o collecion
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        // Guardar datos
        await setDoc(newDoc, newNote);

        // añadiendo la propiedad id de la nota a la nota
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        // Obtener uid generado por firebase del usuario conectado
        const { uid } = getState().auth;
        // Error por si no existe el uid
        if (!uid) throw new Error('El uid del usuario no existe');
        // Cargar notas con el uid atraves del helper
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        // Obtener uid generado por firebase del usuario conectado
        const { uid } = getState().auth;
        // Obtener la nota activa
        const { active: note } = getState().journal;
        // Remover el id de la nota para que no se guarde
        const noteToFireStore = { ...note };
        // Eliminamos propiedad
        delete noteToFireStore.id;

        // Referencia al documento que quiero actualizar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        // Actualizar en firebase
        await setDoc(docRef, noteToFireStore, { merge: true });
        // Actualizar localmente
        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        // Subir un solo archivo: await fileUpload(files[0]);        

        // Crear arreglos de promesas de la cantidad de archivos a subir
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        // Disparar promesas
        const photosUrls = await Promise.all(fileUploadPromises);

        // Setear fotos
        dispatch(setPhotosToActiveNote(photosUrls));

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        // Obtener uid y el usuario activo
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        // Referencia al documento/nota que quiero eliminar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        // Eliminarlo de firebase
        await deleteDoc(docRef);
        // Eliminarlo localmente del store
        dispatch(deleteNoteById(note.id));

    }
}