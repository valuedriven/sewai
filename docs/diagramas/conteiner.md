# C4 – Diagrama de Contêiner  

```mermaid
C4Container
    title Sistema SeWAI - Diagrama de Contêiner

    Person(customer, "Cliente")
    Person(admin, "Administrador")

    System_Boundary(sewai_boundary, "SeWAI") {

        Container(frontend, "Frontend Web", "Next.js 16+", 
        "Interface da vitrine, carrinho, área autenticada e dashboard")

        Container(backend, "Backend API", "NestJS 11+", 
        "API REST, regras de negócio, tenancy, autenticação, auditoria")

        ContainerDb(database, "PostgreSQL", "Supabase / PostgreSQL 15+", 
        "Persistência relacional com RLS e schema por tenant")
    }

    System_Ext(clerk, "Clerk", "Identity Provider")
    System_Ext(resend, "Resend", "Serviço de e-mail")
    System_Ext(grafana, "Grafana Cloud", "Observabilidade")

    Rel(customer, frontend, "Usa", "HTTPS")
    Rel(admin, frontend, "Usa", "HTTPS")

    Rel(frontend, backend, "Consome API REST", "JSON/HTTPS")
    Rel(backend, database, "Consulta e persiste", "Prisma ORM")

    Rel(backend, clerk, "Valida JWT")
    Rel(backend, resend, "Envia e-mails")
    Rel(backend, grafana, "Exporta logs e métricas")
```