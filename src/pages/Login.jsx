import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import '../styles/Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [nome, setNome] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [senhaRegister, setSenhaRegister] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/tasks');
    } catch (error) {
      alert('Login inválido!');
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(nome, emailRegister, senhaRegister);
      alert('Usuário registrado com sucesso!');
      setIsRegistering(false);
      // limpa os campos
      setNome('');
      setEmailRegister('');
      setSenhaRegister('');
    } catch (error) {
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">VishTarefas</h1>

        {!isRegistering ? (
          <>
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
            <button className="login-link" onClick={() => setIsRegistering(true)}>
              Ainda não tem conta? Registrar
            </button>
          </>
        ) : (
          <>
            <h2 className="login-subtitle">Cadastro</h2>
            <input
              className="login-input"
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={emailRegister}
              onChange={(e) => setEmailRegister(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Senha"
              value={senhaRegister}
              onChange={(e) => setSenhaRegister(e.target.value)}
            />
            <button className="login-button" onClick={handleRegister}>
              Cadastrar
            </button>
            <button className="login-link" onClick={() => setIsRegistering(false)}>
              Já tem conta? Fazer Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
