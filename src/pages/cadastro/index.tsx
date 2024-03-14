import React from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "../../services/api";

import {
  Column,
  Container,
  CriarText,
  EsqueciText,
  Row,
  SubtitleLogin,
  Title,
  TitleLogin,
  Wrapper,
  Desc,
} from "./styles";
import { IFormData } from "./types";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email("E-mail não é valido!").required(),
    password: yup.string().min(8).max(16).required(),
  })
  .required();

const Cadastro = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (formData: IFormData) => {
    try {
        const { data } = await api.post("/users", formData);
        
        navigate("/feed");
          
        
    } catch {
      alert("Erro ao fazer login");
    }
  };

  const navigate = useNavigate();

  const handleClickFeed = () => {
    navigate("/feed");
    };
    
    const handleClickSignIn = () => {
        navigate("/login");
      };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Comece agora grátis</TitleLogin>
            <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                name="name"
                errorMessage={errors?.name?.message}
                control={control}
                placeholder="Nome completo"
              />
              <Input
                name="email"
                errorMessage={errors?.email?.message}
                control={control}
                placeholder="E-mail"
              />
              <Input
                name="password"
                errorMessage={errors?.password?.message}
                control={control}
                placeholder="Senha"
                type="password"
              />
              <Button title="Entrar" variant="secondary" type="submit" />
            </form>
            <Desc>
              Ao clicar em "criar minha conta grátis", declaro que aceito as
              Políticas de Privacidade e os Termos de Uso da DIO.
            </Desc>
            <Row>
              Já tenho conta.{" "}
              <CriarText onClick={handleClickSignIn}>Fazer login</CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Cadastro };
