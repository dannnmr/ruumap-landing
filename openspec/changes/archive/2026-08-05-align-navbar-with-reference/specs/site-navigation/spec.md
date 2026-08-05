## Purpose

Defines how visitors move between sections of the Ruum landing page: what the primary navigation
shows, where each link takes them, and how the mobile menu behaves for keyboard and
assistive-technology users.

## ADDED Requirements

### Requirement: Primary navigation reflects confirmed sections
The header navigation SHALL present a link for each section that currently exists on the page,
using the labels confirmed as provisional content: "Proyectos", "Servicios", "Cómo funciona", and
a "Contacto" call to action.

#### Scenario: Visitor sees the confirmed set of links
- **WHEN** the landing page loads
- **THEN** the header shows exactly the links "Proyectos", "Servicios", "Cómo funciona", and a
  "Contacto" call to action, each activating navigation to its corresponding section

### Requirement: Pending sections are excluded from navigation
The header navigation SHALL NOT present a link for a section that does not yet exist on the page.

#### Scenario: A section without a built destination is not linked
- **WHEN** the landing page loads and a section referenced by the design reference (e.g.
  "Testimonios") has no corresponding section on the page
- **THEN** no navigation link is rendered for that section, and no link resolves to a missing or
  empty destination

### Requirement: Navigation content is centrally configured
Navigation labels, the CTA label, and link targets SHALL be defined in one centralized content
source, consumed identically by both the desktop and mobile presentations of the navigation.

#### Scenario: A label change propagates everywhere it appears
- **WHEN** a navigation label or the CTA label is updated in the centralized content source
- **THEN** the updated text appears in both the desktop navigation and the mobile menu without
  any other part of the navigation needing separate edits

### Requirement: Navigation targets stay synchronized with section identifiers
Every navigation link's target SHALL correspond to an identifier that is defined in exactly one
place and reused by both the navigation and the section it points to, so a link and its
destination cannot silently drift out of sync.

#### Scenario: Every link resolves to an existing section
- **WHEN** the landing page loads
- **THEN** every navigation link's target matches the identifier of a section actually present in
  the rendered page

### Requirement: Smooth scroll to navigation target
Activating a navigation link SHALL scroll the page to the corresponding section using the site's
smooth-scroll behavior, consistent with how scrolling already behaves elsewhere on the page.

#### Scenario: Visitor clicks a desktop navigation link
- **WHEN** a visitor activates a navigation link on desktop
- **THEN** the page scrolls smoothly to the target section rather than jumping instantly

### Requirement: Navigation targets are not obscured by the fixed header
When a visitor navigates to a section via a navigation link, the top of that section's content
SHALL be visible below the fixed header, not hidden underneath it.

#### Scenario: Visitor navigates to "Cómo funciona"
- **WHEN** a visitor activates the "Cómo funciona" link, from the top of the page or from another
  section, on desktop or on mobile
- **THEN** the corresponding section's heading is fully visible below the fixed header, and the
  visitor can continue scrolling normally afterward

#### Scenario: Visitor navigates via the mobile menu
- **WHEN** a visitor opens the mobile menu, activates a link, and the menu closes
- **THEN** the resulting scroll position leaves the target section's content visible below the
  fixed header, with no unexpected jump

### Requirement: Mobile menu is operable via keyboard and communicates its state
The mobile menu trigger and panel SHALL be fully operable using only a keyboard, and SHALL expose
their open/closed state and role to assistive technology.

#### Scenario: Keyboard-only visitor opens and uses the menu
- **WHEN** a visitor reaches the menu trigger via keyboard and activates it
- **THEN** the menu opens, its trigger reflects the open state to assistive technology, and every
  link and the CTA inside the menu are reachable and activatable via keyboard

#### Scenario: Visitor closes the menu with Escape
- **WHEN** the mobile menu is open and the visitor presses Escape
- **THEN** the menu closes and focus returns to the element that opened it

### Requirement: Mobile menu contains focus and blocks background interaction while open
While the mobile menu is open, keyboard focus SHALL stay within the menu, the page behind it
SHALL NOT be scrollable, and content behind the menu SHALL NOT be reachable by keyboard.

#### Scenario: Visitor tabs through an open menu
- **WHEN** the mobile menu is open and the visitor repeatedly presses Tab
- **THEN** focus cycles only among the elements inside the menu and never reaches content behind
  it, and the page behind the menu does not scroll

#### Scenario: Visitor selects a link inside the menu
- **WHEN** the visitor activates a link or the CTA inside the open mobile menu
- **THEN** the menu closes and the page navigates to the selected target

### Requirement: Header visual tokens align with the reference where equivalent
The header's background and border SHALL use the site's shared design tokens wherever doing so
produces no perceptible visual difference from the confirmed visual reference; where a shared
token is not visually equivalent, the header SHALL keep its current value.

#### Scenario: Shared token matches the reference
- **WHEN** the header background is compared against the confirmed visual reference using a
  shared design token in place of a one-off value
- **THEN** no perceptible visual difference is observed, and the shared token is used

#### Scenario: Shared token does not match the reference
- **WHEN** a shared design token would visibly differ from the header's current appearance in the
  confirmed reference
- **THEN** the header keeps its current value instead of adopting the token
