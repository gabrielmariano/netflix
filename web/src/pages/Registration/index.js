import React from 'react';

import { Wrapper, Form, Input, Button } from './styles';

import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';

function Registration() {
    const { user } = history.location.state;

    const [loading, setLoading] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState(user);

    const createNewUser = async () => {
        try {
            setLoading(true);

            const { data } = await api.post('/usuario', {
                ...userInfo,
                usuario: userInfo.email.split('@')[0],
            });

            setLoading(false);

            toast.success('Usuário cadastrado com sucesso.');
            history.push('/');
        } catch (err) {
            toast.error('Erro ao cadastrar usuário');
            return;
        }
    };

    return (
        <Wrapper>
            <Form>
                <Input
                    type="text"
                    contentEditable="false"
                    id="email"
                    name="email"
                    value={user.email}
                />
                <Input
                    type="password"
                    id="senha"
                    name="senha"
                    onChange={(event) => {
                        setUserInfo({
                            ...userInfo,
                            [event.target.name]: event.target.value,
                        });
                    }}
                />
                <Button
                    onClick={() => {
                        createNewUser();
                    }}
                >
                    Cadastrar
                </Button>
            </Form>
        </Wrapper>
    );
}

export default Registration;
