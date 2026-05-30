export default function Projects() {
  return (
    <section>
      <h2>Projects</h2>
      <p>
        Here are some projects I've worked on:
      </p>

      <ul style={{ listStyle: "none", marginLeft: 0, marginTop: "20px" }}>
        <li style={{ marginBottom: "20px" }}>
          <strong>Life Blog</strong>
          <p>A full-stack blog built with React, Spring Boot, and PostgreSQL. Minimal design inspired by Nathan Gilbert.</p>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <strong>Project 2</strong>
          <p>Description of your second project goes here.</p>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <strong>Project 3</strong>
          <p>Description of your third project goes here.</p>
        </li>
      </ul>
    </section>
  );
}
