import React from 'react';
import { FaSpinner } from 'react-icons/all';
import { NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';

import {
    Wrapper,
    Header,
    Button,
    Box,
    Text,
    Login,
    Check,
    Facebook,
    Novo,
    Captcha,
    Footer,
} from './styles';

import logo from '../../assets/images/logo.png';

function SignIn() {
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: '',
        senha: '',
    });

    const handleOnChange = (event) => {
        event.preventDefault();

        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const userSignIn = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            const { data } = await api.post('/auth', user);

            if (!data) {
                toast.info('Usuário não cadastrado');
                return;
            }

            const parsedJson = JSON.stringify(data);
            localStorage.setItem('netflixProfile', parsedJson);

            history.push('/dashboard');

            setLoading(false);
            setLoading(false);
        } catch (err) {
            toast.error(`Erro ao autenticar - ${err}`);
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Header>
                <img src={logo} />
            </Header>


                <Box>
                    <Text>Entrar</Text>
                    <Login>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email ou número de telefone"
                            value={user.user}
                            onChange={(event) => {
                                handleOnChange(event);
                            }}
                        />
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            value={user.senha}
                            onChange={(event) => {
                                handleOnChange(event);
                            }}
                        />

                        <Button
                            disabled={loading}
                            loading={loading}
                            onClick={(event) => {
                                userSignIn(event);
                            }}
                        >
                            {loading ? (
                                <FaSpinner color="#fff" size="32" />
                            ) : (
                                <span>Entrar</span>
                            )}
                        </Button>

                        <Check>
                            <p>
                                <input
                                    type="checkbox"
                                    name="check"
                                    value="senha"
                                />
                                <span>Lembre-se de mim</span>
                                <a href="">Precisa de ajuda?</a>
                            </p>
                        </Check>

                        <Facebook>
                            <a href="">
                                <p>
                                    <img
                                        class="icon-facebook"
                                        src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png"
                                        height="20px"
                                    ></img>
                                    <span>Conectar com Facebook</span>
                                </p>
                            </a>
                        </Facebook>

                        <Novo>
                            <span>
                                Novo por aqui?
                                <NavLink to="/signup">Assine agora</NavLink>
                            </span>
                        </Novo>

                        <Captcha>
                            <p>Esta página é protegida pelo Google reCAPTCHA</p>
                            <p>
                                para garantir que você não é um robô.
                                <a href=""> Saiba mais.</a>
                            </p>
                        </Captcha>
                    </Login>
                </Box>

            <Footer>aqui fica meu footer</Footer>
        </Wrapper>
    );
}

export default SignIn;
