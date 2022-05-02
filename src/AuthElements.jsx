export function AuthElements(props) {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "right",
        justifyContent: "right",
      }}
    >
      <h1 id="banner"> </h1>
      <br />
      <form onSubmit={props.google}>
        <button
          id="google"
          style={{
            width: "300px",
            height: "50px",
          }}
          type="submit"
        >
          Sign in with Google
        </button>
      </form>
      <br />
      <br />
      <form onSubmit={props.out}>
        <button
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
          id="delete"
          style={{
            width: "300px",
            height: "50px",
          }}
          type="submit"
        >
          Delete account
        </button>
      </form>
    </div>
  );
}
