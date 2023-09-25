import "./Contact.scss";

const Contact = () => {
    return (
        <div className="contact">
            <h2>Contact</h2>
            <p>Vous avez un projet ? Discutons-en !</p>
            <form action="traitement.php" method="post">
                <label htmlFor="name">Nom</label>
                <input className="input" type="text" id="name" name="nom" required autoComplete="name" />
        
                <label htmlFor="email">E-mail</label>
                <input className="input" type="email" id="email" name="email" required autoComplete="email" />
        
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="4" cols="50" required></textarea>
        
                <input className="send" type="submit" value="Envoyer" />
            </form>
        </div>
    )
}

export default Contact;