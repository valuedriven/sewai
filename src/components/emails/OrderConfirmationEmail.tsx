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
    Hr,
    Column,
    Row,
} from '@react-email/components';
import React from 'react';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    image_url?: string;
}

interface OrderConfirmationEmailProps {
    orderId: string;
    customerName: string;
    items: OrderItem[];
    total: number;
}

export const OrderConfirmationEmail = ({
    orderId,
    customerName,
    items,
    total,
}: OrderConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Confirmação do Pedido #{orderId}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Pedido Confirmado</Heading>
                    <Text style={text}>
                        Olá {customerName},
                    </Text>
                    <Text style={text}>
                        Obrigado por sua compra! Recebemos seu pedido e estamos preparando tudo com carinho.
                    </Text>
                    <Section style={orderInfo}>
                        <Text style={orderIdText}>Pedido #{orderId}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section>
                        {items.map((item, index) => (
                            <Row key={index} style={itemRow}>
                                <Column style={{ width: '60px' }}>
                                    {item.image_url && (
                                        <Img
                                            src={item.image_url}
                                            width="50"
                                            height="50"
                                            style={itemImage}
                                            alt={item.name}
                                        />
                                    )}
                                </Column>
                                <Column>
                                    <Text style={itemName}>{item.name}</Text>
                                    <Text style={itemMeta}>Qtd: {item.quantity}</Text>
                                </Column>
                                <Column style={{ textAlign: 'right' }}>
                                    <Text style={itemPrice}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    <Hr style={hr} />

                    <Section style={totalSection}>
                        <Row>
                            <Column>
                                <Text style={totalLabel}>Total</Text>
                            </Column>
                            <Column style={{ textAlign: 'right' }}>
                                <Text style={totalValue}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    <Section style={btnContainer}>
                        <Link style={button} href={`https://sewai.com.br/pedidos/${orderId}`}>
                            Acompanhar Pedido
                        </Link>
                    </Section>

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
    textAlign: 'center' as const,
};

const text = {
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '16px 0',
};

const orderInfo = {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '4px',
    margin: '24px 0',
    textAlign: 'center' as const,
};

const orderIdText = {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0',
};

const hr = {
    borderColor: '#e5e7eb',
    margin: '20px 0',
};

const itemRow = {
    marginBottom: '16px',
};

const itemImage = {
    borderRadius: '4px',
    objectFit: 'cover' as const,
};

const itemName = {
    fontSize: '14px',
    fontWeight: '500',
    margin: '0',
};

const itemMeta = {
    fontSize: '12px',
    color: '#6b7280',
    margin: '4px 0 0',
};

const itemPrice = {
    fontSize: '14px',
    fontWeight: '500',
    margin: '0',
};

const totalSection = {
    margin: '24px 0',
};

const totalLabel = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0',
};

const totalValue = {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0',
};

const btnContainer = {
    textAlign: 'center' as const,
    marginTop: '32px',
};

const button = {
    backgroundColor: '#000000',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px 24px',
    maxWidth: '200px',
    margin: '0 auto',
};

const footer = {
    fontSize: '12px',
    lineHeight: '1.5',
    margin: '32px 0 0',
    color: '#8898aa',
    textAlign: 'center' as const,
};

export default OrderConfirmationEmail;
