import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import React from 'react';

interface WelcomeEmailProps {
    firstName?: string;
}

export const WelcomeEmail = ({ firstName }: WelcomeEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Bem-vindo à Sewai!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Bem-vindo à Sewai!</Heading>
                    <Text style={text}>
                        Olá {firstName ? firstName : 'usuário'},
                    </Text>
                    <Text style={text}>
                        Estamos muito felizes em tê-lo conosco. Explore nossa coleção exclusiva e aproveite o melhor da moda.
                    </Text>
                    <Section style={btnContainer}>
                        <Link style={button} href="https://sewai.com.br">
                            Começar a Comprar
                        </Link>
                    </Section>
                    <Text style={text}>
                        Se tiver alguma dúvida, respondab este e-mail e teremos prazer em ajudar.
                    </Text>
                    <Text style={footer}>
                        Sewai - Moda Premium
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '560px',
};

const h1 = {
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25',
    margin: '16px 0',
};

const text = {
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '16px 0',
};

const btnContainer = {
    textAlign: 'center' as const,
};

const button = {
    backgroundColor: '#000000',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
    margin: '0 auto',
};

const footer = {
    fontSize: '12px',
    lineHeight: '1.5',
    margin: '16px 0',
    color: '#8898aa',
};

export default WelcomeEmail;
