# Flow — Browse and copy

```mermaid
flowchart TD
    A[STUDIO-01 Landing] --> B[STUDIO-02 Public Catalog]
    B --> C[STUDIO-03 Public System]
    C -->|unsigned download| D[STUDIO-05 Login]
    D --> C
    C -->|POST download| E[purposeTracks]
    E --> F[App PURPOSE-03 Track]
    C --> G[STUDIO-04 Public Creator]
```
