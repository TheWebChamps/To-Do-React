import "./AuthElements.css";
export function AuthElements(props) {
  return (
    <div
      id="main"
    >
      <h1 id="banner"> </h1>
      <br />
      <form onSubmit={props.google}>
        <button
          className="auth"
          id="google"
          type="submit"
          style={{
            width: "300px",
            height: "50px",
          }}
        >
          Sign in with Google
        </button>
      </form>
      <br />
      <br />
      <form onSubmit={props.out}>
        <button
          className="auth"
          type="submit"
          id="signOut"
          style={{
            width: "300px",
            height: "50px",
          }}
        >
          Sign out
        </button>
      </form>
      <form onSubmit={props.microsoft}>
        <button
          className="auth"
          type="submit"
          id="microsoft"
          style={{
            width: "300px",
            height: "50px",
          }}
        >
          Sign in with Microsoft
        </button>
      </form>
      <br />
      <br />
      <form onSubmit={props.delete}>
        <button
          className="auth"
          id="delete"
          type="submit"
          style={{
            width: "300px",
            height: "50px",
          }}
        >
          Delete account
        </button>
      </form>
    </div>
  );
}
