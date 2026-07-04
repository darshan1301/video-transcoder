# Design Specification — Muxr Web App

This document outlines the visual system, color palette, typography, and visual effect specifications currently implemented in the **Muxr** Web Application. Refer to this specification when creating new UI components or modifying existing layouts.

---

## 1. Typography

Muxr uses a combination of modern geometric sans-serif, editorial serif, and clean monospace fonts to achieve a balanced, high-end aesthetic.

| Font Role | Font Family | Tailwind Class | Usage / Target Elements |
| :--- | :--- | :--- | :--- |
| **Primary Body** | `GeistSans` | Default (`font-sans`) | Body copy, navigation links, buttons, inputs, form labels. |
| **Headings & Logo** | System Serif | `font-serif` | App logo branding ("Muxr"), main landing headlines, section titles. |
| **Technical Data** | System Monospace | `font-mono` | Console logs, file sizes, checksums, format tags, timestamps. |

---

## 2. Color Palette (Base Theme System)

Base colors are defined in the `@theme` configuration using `oklch` color spaces, supporting both **Light Mode** and **Dark Mode** seamlessly.

### 2.1 Base Colors (Light Mode vs. Dark Mode)

| Variable Name | Tailwind Class | Light Mode (`:root`) | Dark Mode (`.dark`) | Description |
| :--- | :--- | :--- | :--- | :--- |
| `--background` | `bg-background` | `oklch(1 0 0)` (Pure White) | `oklch(0.145 0 0)` (Charcoal Black) | The primary canvas background. |
| `--foreground` | `text-foreground` | `oklch(0.145 0 0)` (Charcoal) | `oklch(0.985 0 0)` (Off-White) | Default text color. |
| `--primary` | `bg-primary` | `oklch(0.205 0 0)` (Dark Grey) | `oklch(0.922 0 0)` (Light Grey) | Accent buttons, solid dark containers. |
| `--secondary` | `bg-secondary` | `oklch(0.97 0 0)` (Light Grey) | `oklch(0.269 0 0)` (Slate Grey) | Secondary actions and card backdrops. |
| `--muted` | `text-muted-foreground` | `oklch(0.556 0 0)` (Medium Slate) | `oklch(0.708 0 0)` (Soft Slate) | Secondary description text and labels. |
| `--accent` | `bg-accent` | `oklch(0.97 0 0)` (Light Grey) | `oklch(0.269 0 0)` (Slate Grey) | Hover states and subtle highlights. |
| `--border` | `border-border` | `oklch(0.922 0 0)` (Light Border) | `oklch(1 0 0 / 10%)` (Semi-transparent) | Dividers and card borders. |

---

## 3. Brand & Contextual Accents

Special accent colors highlight states, pipelines, and decorative elements.

### 3.1 Primary Accent: Amber / Gold
Used for active statuses, key configuration highlights, icons, and ambient glow effects.
*   **Base Color:** `oklch(0.75 0.13 70)` (equivalent to Tailwind's `amber-500` / `#f59e0b`).
*   **State indicators:** `text-amber-500`, `fill-amber-500`, `border-amber-500`, `bg-amber-500/5`.

### 3.2 Contextual Colors
*   **Success (Green):** Used for completed transcoding processes.
    *   *Colors:* `text-green-500`, `bg-green-500/10`, `border-green-500/30`.
*   **Destructive (Red):** Used for deletions, cancel actions, and error flags.
    *   *Colors:* `text-red-500`, `bg-red-500/10`, `border-red-500/15`.
    *   *Theme Variable:* `oklch(0.577 0.245 27.325)` (light) / `oklch(0.704 0.191 22.216)` (dark).

---

## 4. Visual Effects & Ambient Styling

### 4.1 Ambient Glows (Radial Gradients)
To create a premium, modern feel, pages utilize radial glows at the top or corners.
*   **Top Glow:**
    ```css
    radial-gradient(ellipse_at_top, oklch(0.75 0.13 70 / 0.15), transparent 70%)
    ```
*   **Bottom Glow (Subtle):**
    ```css
    radial-gradient(circle_at_bottom_right, oklch(0.75 0.13 70 / 0.05), transparent 70%)
    ```

### 4.2 Glassmorphism & Borders
*   **Glass panels:** Cards use semi-transparent backgrounds with backdrop filters for a premium frosted look: `bg-card/60 backdrop-blur-xl`.
*   **Active shadow glows:** Active file drops and buttons use custom box-shadow drops with oklch accent tints, e.g., `shadow-[0_0_25px_-5px_oklch(0.75_0.13_70/0.2)]`.
