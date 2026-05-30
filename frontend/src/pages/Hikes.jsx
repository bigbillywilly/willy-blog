export default function Hikes() {
  return (
    <section>
      <h2>Hikes</h2>
      <p>
        Favorite hikes and outdoor adventures:
      </p>

      <ul style={{ listStyle: "none", marginLeft: 0, marginTop: "20px" }}>
        <li style={{ marginBottom: "20px" }}>
          <strong>Hike 1</strong>
          <p>Description of a memorable hike goes here. Include location, difficulty, and what made it special.</p>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <strong>Hike 2</strong>
          <p>Description of another great hiking experience.</p>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <strong>Hike 3</strong>
          <p>Description of your favorite outdoor adventure.</p>
        </li>
      </ul>
    </section>
  );
}
