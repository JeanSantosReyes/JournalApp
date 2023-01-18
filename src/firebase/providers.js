import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Crear instancia
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        // const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, } = resp.user;
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            ok: true,
            uid, photoURL, email, displayName,
        }

    } catch (error) {
        const errorMessage = error.message;

        if (errorMessage === 'Firebase: Error (auth/network-request-failed).') return { ok: false, errorMessage: 'Sin conexion a internet' };

        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        const errorMessage = error.message;

        if (errorMessage === 'Firebase: Error (auth/user-not-found).') return { ok: false, errorMessage: 'Correo no encontrado' };
        if (errorMessage === 'Firebase: Error (auth/wrong-password).') return { ok: false, errorMessage: 'Contraseña incorrecta' };
        if (errorMessage === 'Firebase: Error (auth/invalid-email).') return { ok: false, errorMessage: 'Ingresar correo y contraseña' };

        return {
            ok: false,
            errorMessage
        }
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}