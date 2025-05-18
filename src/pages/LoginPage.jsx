// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import API_BASES from "../apiConfig";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch(`${API_BASES.banco}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha ao fazer login. Verifique suas credenciais.");
      }

      const data = await response.json();

      // Exemplo: salvar token no localStorage
      localStorage.setItem("token", data.token);

      // Redireciona para a dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="login-form">
            <h2>Login</h2>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Entrar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
