## MODIFIED Requirements

### Requirement: Project entries are centrally configured
Each project's name, developer, location, image, developer-linking slug, its own profile slug,
category/relation label, and "Ver proyecto" link SHALL be defined in a centralized content
source, not hardcoded in the section's markup or in any profile template.

#### Scenario: Editing a project
- **WHEN** a project's name, developer, location, image, or linking fields are updated in the
  centralized content source
- **THEN** the catalog and any profile that lists the project reflect the change without any
  modification to the section's or profile's component code

### Requirement: "Ver proyecto" reflects the project's actual link state
A project's own destination link — its "Ver proyecto" action and its card's image/name, wherever
either appears (the landing catalog card or a developer profile's project list) — SHALL only be
interactive when the project has a configured destination link; a project without one SHALL show
both in a non-interactive, clearly inactive state instead of linking to a fabricated or
placeholder URL.

#### Scenario: Project has no configured link yet
- **WHEN** a project's centralized data has no destination URL
- **THEN** its "Ver proyecto" action and its card's image/name render without a functioning href
  and do not navigate anywhere when activated, in every place they appear

#### Scenario: Project has a configured link
- **WHEN** a project's centralized data includes a destination URL
- **THEN** its "Ver proyecto" action and its card's image/name are functioning links that navigate
  to that URL, internal or external as configured, in every place they appear

## ADDED Requirements

### Requirement: Catalog card's developer label navigates to that developer's profile
A project card's developer label, wherever it appears (the landing catalog card; a developer
profile's own project lists omit this label entirely, per developer-profiles), SHALL let a visitor
navigate to that project's developer profile, resolved through the project's developer-linking
slug, when the referenced developer is present in the centralized content source. This is
independent of the project's own destination link ("Ver proyecto" and the card's image/name) —
the two navigate to different places: the developer label to the developer's profile, the rest of
the card to the project's own destination.

#### Scenario: Visitor selects a project card's developer label
- **WHEN** a visitor activates a project card's developer label in the catalog
- **THEN** the visitor is taken to that project's developer profile at the route derived from the
  developer's slug

#### Scenario: Project has no configured developer slug
- **WHEN** a project's centralized data has no developer-linking slug, or the referenced slug has
  no matching developer entry
- **THEN** the developer label does not offer navigation to a broken or non-existent profile
  (renders as plain text instead)
