import './About.css';

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img
          src="../../images/author-photo.jpg"
          alt="Foto del autor"
          className="about__image"
        />
        <div className="about__content">
          <h2 className="about__title">Acerca del autor</h2>
          <p className="about__text">
            Este bloque describe al autor del proyecto. Aquí debe indicar tu nombre, a
            qué te dedicas y qué tecnologías de desarrollo conoces.
          </p>
          <p className="about__text">
            También puedes hablar de tu experiencia con Practicum, de lo que
            aprendiste allí y de cómo puedes ayudar a los clientes potenciales.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
