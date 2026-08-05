## Purpose

Defines shared content and structural rules for the Ruum landing's informational sections between
the Hero and the Footer (Statement, Stats, FeatureSection, HowItWorks, ClosingCTA, Footer), so
their copy stays centralized, aligned with the confirmed visual reference, and consistent in
responsiveness and motion behavior.

## ADDED Requirements

### Requirement: Statement matches the confirmed reference
The Statement section's copy and single-column, centered layout SHALL match the confirmed visual
reference, with no image or additional content introduced.

#### Scenario: Visitor views Statement
- **WHEN** the Statement section renders
- **THEN** its text and layout match the confirmed reference, without an image or extra elements

### Requirement: Stats presents the four confirmed metrics
The Stats section SHALL present exactly four metrics, each with the value and label confirmed from
the reference: "+50" / "proyectos diseñados", "15" / "desarrolladores inmobiliarios", "+20" /
"países servicios prestados", and "+100" / "unidades vendidas usando Ruum".

#### Scenario: Visitor views Stats
- **WHEN** the Stats section renders
- **THEN** exactly four value/label pairs are shown, matching the confirmed reference

### Requirement: FeatureSection presents its five rows without requiring horizontal scrolling
FeatureSection SHALL present its five feature rows (eyebrow, heading, description, image) stacked
so a visitor can read all of them using only vertical scrolling.

#### Scenario: Visitor browses FeatureSection
- **WHEN** a visitor scrolls through FeatureSection
- **THEN** every one of the five rows becomes visible through vertical scrolling alone, with no
  horizontal scroll or pinned-carousel interaction required

### Requirement: HowItWorks presents its three steps as a non-pinned row
HowItWorks SHALL present its three numbered steps (number, title, description) without pinning the
viewport or requiring scroll distance beyond the section's natural height.

#### Scenario: Visitor scrolls past HowItWorks
- **WHEN** a visitor scrolls through the HowItWorks section
- **THEN** the section scrolls past at the same rate as the rest of the page, without pinning the
  viewport or requiring additional scroll to reveal any of the three steps

### Requirement: ClosingCTA presents a contact reference alongside the call to action
ClosingCTA SHALL present a named point of contact (name, phone, email) alongside its heading and
primary call to action.

#### Scenario: Visitor views ClosingCTA
- **WHEN** the ClosingCTA section renders
- **THEN** a contact name, phone number, and email are visible next to the section's call to action

### Requirement: Footer presents the confirmed link columns and social links
The Footer SHALL present exactly the three link columns confirmed from the reference ("Producto":
Proyectos, Recorridos 3D, Precios; "Compañía": Nosotros, Contacto; "Legal": Privacidad, Términos)
and a row of social links (Facebook, Instagram).

#### Scenario: Visitor views Footer
- **WHEN** the Footer renders
- **THEN** it shows the three confirmed columns with their confirmed links, and a row with
  Facebook and Instagram social links

### Requirement: Section content is centrally configured
All copy, values, and images for Statement, Stats, FeatureSection, HowItWorks, ClosingCTA, and
Footer SHALL be defined in a centralized content source, not hardcoded in their components.

#### Scenario: Editing shared section copy
- **WHEN** copy, a value, or an image for one of these sections is updated in the centralized
  content source
- **THEN** the section reflects the change without any modification to its component markup

### Requirement: Provisional content is marked as such
Content sourced only from the visual reference, not yet confirmed by the product owner as final
production data, SHALL be marked as provisional in the centralized content source.

#### Scenario: Reviewing provisional content
- **WHEN** a developer inspects the centralized content source for one of these sections
- **THEN** entries sourced only from the reference and not yet confirmed as final are clearly
  marked as provisional

### Requirement: New or changed scroll animations respect reduced motion
Any new or modified scroll-driven animation introduced in these sections SHALL show its final
visual state without the animated transition when the visitor's system preference requests reduced
motion.

#### Scenario: Visitor has reduced motion enabled
- **WHEN** a visitor with `prefers-reduced-motion: reduce` scrolls through a section with a new or
  modified scroll animation
- **THEN** the section displays its end-state content without the animated transition
