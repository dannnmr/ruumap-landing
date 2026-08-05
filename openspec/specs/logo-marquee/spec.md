# logo-marquee Specification

## Purpose

Defines the reusable logo-ticker (marquee) primitive and the clients/partners section built on it,
so partner and client logos can be added, removed, or reclassified from centralized data with a
continuous, accessible, non-disruptive scrolling presentation.

## Requirements

### Requirement: Logos are centrally configured
The set of logos shown in the marquee, including each logo's image and accessible name, SHALL be
defined in a centralized content source, not hardcoded per-logo in the section's markup.

#### Scenario: Adding or removing a logo
- **WHEN** a logo is added to, removed from, or reordered in the centralized content source
- **THEN** the marquee reflects the change without any modification to the marquee component's
  markup

### Requirement: Marquee loops continuously without a visible restart
The marquee SHALL scroll its logos continuously in a loop, with no visible jump, gap, or reset when
the loop repeats.

#### Scenario: Visitor watches the marquee over a full loop cycle
- **WHEN** a visitor observes the marquee for longer than one full loop cycle
- **THEN** the motion continues smoothly across the loop boundary with no visible jump or blank gap

### Requirement: Marquee supports one or two independently directed rows
The marquee SHALL support being configured as a single row or as two rows, each row independently
configured to scroll in either direction.

#### Scenario: Two rows configured with opposite directions
- **WHEN** the section is configured with two rows, one set to scroll left and the other right
- **THEN** each row scrolls continuously in its own configured direction, independent of the other
  row

### Requirement: Marquee respects reduced-motion preference
The marquee SHALL NOT auto-scroll when the visitor's system preference requests reduced motion; its
logos SHALL still be visible.

#### Scenario: Visitor has reduced motion enabled
- **WHEN** a visitor with `prefers-reduced-motion: reduce` views the section
- **THEN** the logos are displayed without continuous scrolling motion

### Requirement: Marquee remains usable on narrow viewports
The marquee SHALL remain legible and correctly scaled at mobile viewport widths, without causing
the page to gain horizontal scroll.

#### Scenario: Visitor on a narrow viewport
- **WHEN** the section is viewed on a narrow (mobile-width) viewport
- **THEN** logos remain legible and the marquee's motion does not cause the overall page to gain
  horizontal scroll

### Requirement: Every logo has an accessible name
Each logo image in the marquee SHALL expose the represented company's name to assistive technology.

#### Scenario: Assistive technology user encounters a logo
- **WHEN** a screen reader reaches a logo inside the marquee
- **THEN** it announces the name of the company that logo represents
