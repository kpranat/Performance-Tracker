export default function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Performance Tracker Login</h2>

        <label>Email</label>
        <input type="email" />

        <label>Password</label>
        <input type="password" />

        <button>Sign In</button>
      </div>
    </div>
  );
}