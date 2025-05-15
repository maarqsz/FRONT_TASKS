import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importando o CSS atualizado

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/tasks');
    } catch (error) {
      alert('Login inválido!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">VishTarefas</h1>
        <h2 className="login-subtitle">Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
