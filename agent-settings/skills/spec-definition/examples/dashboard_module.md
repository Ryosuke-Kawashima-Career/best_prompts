# Example: Dashboard Header Spec

## Functional Requirements

- **FR-01: Market Ticker**: The header must display a real-time (update < 1s) ticker of the top 3 currencies.
- **FR-02: Region Selector**: A dropdown allowing the user to switch between "Global," "Europe," and "Asia."

## Non-Functional Requirements

- **NFR-01: Latency**: The header must load in under 150ms on a 4G connection.
- **NFR-02: Accessibility**: Colors must have a contrast ratio of at least 4.5:1 (WCAG AA).

## Acceptance Criteria

- **AC-01 (Ref: FR-01)**: Ticker updates without a page refresh when backend emits a `socket` event.
  - *Verification*: Open DevTools -> Watch Network Tab for WebSocket frame.
- **AC-02 (Ref: FR-02)**: Selecting "Asia" updates the map boundaries immediately.
  - *Verification*: Manual click -> Confirm map center coordinates.
