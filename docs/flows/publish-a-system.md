# Flow — Publish a system

```mermaid
flowchart TD
    A[STUDIO-05 Login] --> B[STUDIO-06 My Systems]
    B --> C[STUDIO-07 New System]
    C --> D[STUDIO-08 System Editor]
    B --> D
    D -->|publish| E[STUDIO-02 Public Catalog]
    B --> F[STUDIO-09 Creator Profile]
    F --> G[STUDIO-04 Public Creator]
```
