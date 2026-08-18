# Mermaid Architecture & Flow Templates

Use these production-grade templates when synthesizing Mermaid diagrams.

---

## 1. Multi-Process Architecture (e.g. Tauri / Electron)

```mermaid
flowchart TB
    subgraph Frontend["Frontend Layer (WebView / Renderer)"]
        UI["UI Components (React / Vue / Svelte)"]
        StateStore["Client State (Zustand / Redux / Signals)"]
        ClientBridge["IPC Client API (@tauri-apps/api)"]
        UI --> StateStore
        StateStore --> ClientBridge
    end

    subgraph IPCBridge["IPC Transport / Native Webview Bridge"]
        Bridge["postMessage / Named Pipes / Webview Message Handlers"]
    end

    subgraph Backend["Core Process (Rust / Node.js)"]
        Router["Command Dispatcher / Router"]
        Handlers["Command Handlers"]
        BackendState["Managed App State"]
        OS["OS APIs & Filesystem"]

        Router --> Handlers
        Handlers --> BackendState
        Handlers --> OS
    end

    ClientBridge -->|Serialize JSON Payload| Bridge
    Bridge -->|Invoke Command| Router
    Handlers -.->|Return JSON Result / Error| Bridge
    Bridge -.->|Resolve Promise| ClientBridge
```

---

## 2. IPC Request-Response Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as Frontend UI (React)
    participant IPC as Tauri IPC Bridge
    participant Backend as Rust Backend (lib.rs)
    participant State as Managed State / FS

    User->>UI: Click action (e.g. Save Diagram)
    UI->>IPC: invoke("save_diagram", { diagramData })
    Note over UI,IPC: Serializes payload to JSON
    IPC->>Backend: Dispatch command to #[tauri::command] handler
    Backend->>State: Validate & write to disk / update state
    State-->>Backend: Result (Success / Error)
    Backend-->>IPC: serde_json::to_value(result)
    IPC-->>UI: Resolve Promise with response
    UI->>User: Display success notification
```

---

## 3. Clean / Layered Architecture

```mermaid
flowchart TD
    subgraph Presentation["1. Presentation Layer"]
        Controllers["Controllers / Handlers"]
        DTOs["Request / Response DTOs"]
    end

    subgraph Application["2. Application / Use Case Layer"]
        UseCases["Use Case Interactors"]
        PortIn["Input Ports (Interfaces)"]
    end

    subgraph Domain["3. Domain Layer (Core Business Logic)"]
        Entities["Domain Entities"]
        ValueObjects["Value Objects"]
        DomainServices["Domain Services"]
    end

    subgraph Infrastructure["4. Infrastructure Layer"]
        DB["Database Repositories"]
        ExternalAPIs["External API Clients"]
        PortOut["Output Ports (Adapters)"]
    end

    Presentation --> Application
    Application --> Domain
    Infrastructure --> PortOut
    Application ..-> PortOut
```
