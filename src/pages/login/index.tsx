import React from 'react'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { api } from "../../services/api"

import { Column, Container, CriarText, EsqueciText, Row, SubtitleLogin, Title, TitleLogin, Wrapper } from './styles';
import { IFormData } from './types';

const schema = yup
  .object({
    email: yup.string().email('E-mail não é valido!').required(),
    password: yup.string().min(8).max(16).required(),
  })
    .required()
  
const Login = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<IFormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
    })

    
    const onSubmit = async (formData: IFormData) => {
        try {
            const { data } = await api.get(`users?email=${formData.email}&password=${formData.password}`);
            
            if (data.length === 1) {
                navigate('/feed')
            } else {
                alert("Usuário não encontrado")
            }

        } catch {
            alert("Erro ao fazer login")
        }
    }
    
    const navigate = useNavigate();

    const handleClickSignUp = () => {
        navigate('/cadastro')
    }

  return (
    <>
     <Header />
        <Container>
            <Column>
                <Title>
                    A plataforma para você aprender com experts, dominar as principais tecnologias
                     e entrar mais rápido nas empresas mais desejadas.
                </Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Faça login</TitleLogin>
                    <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name="email" errorMessage={errors?.email?.message}  control={control} placeholder="E-mail" />
                        <Input name="password" errorMessage={errors?.password?.message} control={control}  placeholder="Senha" type="password" />
                        <Button title="Entrar" variant="secondary" type="submit" />
                    </form>
                    <Row>
                        <EsqueciText>Esqueci minha senha</EsqueciText>
                        <CriarText onClick={handleClickSignUp}>Criar Conta</CriarText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>
  )
}

export { Login } 