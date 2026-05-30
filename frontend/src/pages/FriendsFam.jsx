export default function FriendsFam() {
  return (
    <section>
      <h2>Friends & Family</h2>
      <p>
        People who matter to me:
      </p>

      <ul style={{ listStyle: "none", marginLeft: 0, marginTop: "20px" }}>
        <li style={{ marginBottom: "20px" }}>
          <strong>Friend 1</strong>
          <p>A bit about why they're important to you and what you enjoy doing together.</p>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <strong>Friend 2</strong>
          <p>Share a memory or what you appreciate about this person.</p>
        </li>
        <li style={{ marginBottom: "20px" }}>
          <strong>Family Member</strong>
          <p>Write about someone in your family who's been influential in your life.</p>
        </li>
      </ul>
    </section>
  );
}
