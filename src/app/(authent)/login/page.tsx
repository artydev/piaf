"use client"

import styles  from './page.module.css'

function Login() {
   return (
    <div className={styles.formWrapper}>
        <form className={styles.form}>
        <p className={styles.formTitle}>Connexion</p>
            <div className={styles.inputContainer}>
            <input type="email" placeholder="Votre adresse email" />
            <span>
            </span>
        </div>
        <div className={styles.inputContainer}>
            <input type="password" placeholder="Votre mot de passe" />
            </div>
            <button type="submit" className={styles.submit}>
            Login
        </button>

        <p className={styles.signupLink}>
             
            <a href="">Enregistrez-vous</a>
        </p>
    </form>
   </div>
   )
}

export default Login;