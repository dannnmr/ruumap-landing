# project-catalog Specification

## Purpose

Defines how the Ruum landing's projects/portfolio catalog presents individual real-estate projects
and lets visitors browse them, so entries can be added, edited, or reordered from centralized data
without touching the section's markup, and so unconfirmed data is never fabricated.

## Requirements

### Requirement: Project entries are centrally configured
Each project's name, developer, location, image, future profile slug, and future "Ver proyecto"
link SHALL be defined in a centralized content source, not hardcoded in the section's markup.

#### Scenario: Editing a project
- **WHEN** a project's name, developer, location, or image is updated in the centralized content
  source
- **THEN** the catalog reflects the change without any modification to the section's component code

### Requirement: Each catalog card shows project, developer, and location
Every visible project card SHALL display the project's name, its developer, and its location.

#### Scenario: Visitor views a project card
- **WHEN** a visitor views a card in the projects catalog
- **THEN** the project's name, developer, and location are all visible on the card

### Requirement: "Ver proyecto" reflects the project's actual link state
A project's "Ver proyecto" action SHALL only be interactive when the project has a configured
destination link; a project without one SHALL show the action in a non-interactive, clearly
inactive state instead of linking to a fabricated or placeholder URL.

#### Scenario: Project has no configured link yet
- **WHEN** a project's centralized data has no destination URL
- **THEN** its "Ver proyecto" action renders without a functioning href and does not navigate
  anywhere when activated

#### Scenario: Project has a configured link
- **WHEN** a project's centralized data includes a destination URL
- **THEN** its "Ver proyecto" action is a functioning link that navigates to that URL, internal or
  external as configured

### Requirement: Catalog is browsable via explicit navigation controls
The catalog SHALL provide explicit previous/next controls that let a visitor move between projects,
rather than relying on free-form horizontal scrolling as the only way to browse.

#### Scenario: Visitor has more projects than fit on screen
- **WHEN** the catalog contains more projects than are simultaneously visible
- **THEN** previous/next controls are present and move the visible set forward or backward

#### Scenario: Visitor is at the start or end of the catalog
- **WHEN** the visitor is viewing the first or last project
- **THEN** the control that would move further in that direction communicates that it has no
  further effect, rather than behaving unpredictably

### Requirement: Catalog remains usable on narrow viewports
The catalog's cards and navigation controls SHALL remain legible and operable at mobile viewport
widths, adapting the number of simultaneously visible cards as needed.

#### Scenario: Visitor on a narrow viewport
- **WHEN** the catalog is viewed on a narrow (mobile-width) viewport
- **THEN** cards remain fully legible and the navigation controls remain reachable and operable,
  even if fewer cards are visible at once than on desktop

### Requirement: Catalog entries reflect only confirmed data
The catalog SHALL NOT display a project whose developer or location has not been confirmed from
project content; an entry lacking that confirmed data SHALL be omitted rather than shown with
placeholder or invented values.

#### Scenario: A known project lacks confirmed developer/location data
- **WHEN** a project exists elsewhere in the product but its developer or location has not been
  confirmed
- **THEN** that project is not included in the catalog until its data is confirmed and added to the
  centralized content source
