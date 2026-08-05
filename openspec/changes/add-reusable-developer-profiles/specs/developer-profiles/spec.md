## Purpose

Defines how the Ruum landing presents a reusable, data-driven profile page for each real-estate
developer — reachable from a project or developer selection in the landing — so new developers
and their projects can be added by configuring data, without duplicating pages or components.

## ADDED Requirements

### Requirement: Developer profile content is centrally configured
Each developer's identity (name, logo, slogan, cover image), contact information (social links,
address, website), media (video, main image), narrative (description, mission, vision),
representative (name, role, photo), associated projects, press notes, and related links SHALL be
defined in a centralized content source, not hardcoded in the profile template's markup.

#### Scenario: Editing a developer's profile
- **WHEN** a developer's name, description, or any other configured field is updated in the
  centralized content source
- **THEN** the profile reflects the change without any modification to the profile template's
  component code

### Requirement: One reusable template renders every developer profile
The system SHALL render every developer's profile through a single reusable template driven by
that developer's data, and SHALL NOT require a dedicated page or component per developer.

#### Scenario: Adding a new developer
- **WHEN** a new developer entry is added to the centralized content source with a unique slug
- **THEN** its profile becomes reachable through the same dynamic route and template as existing
  developers, without adding new page or component files

### Requirement: Profile route resolves by developer slug
The system SHALL expose each configured developer's profile at a URL derived from that
developer's unique slug, using a Next.js App Router dynamic route.

#### Scenario: Visitor opens a configured developer's profile
- **WHEN** a visitor navigates to the profile URL for a developer slug present in the centralized
  content source
- **THEN** that developer's profile page renders with its configured content

### Requirement: Unknown developer slug shows a not-found fallback
The system SHALL NOT render a profile, invented or partial, for a slug that does not match a
developer in the centralized content source.

#### Scenario: Visitor navigates to an unconfigured slug
- **WHEN** a visitor navigates to a profile URL whose slug has no matching developer entry
- **THEN** the system renders a not-found response instead of a broken or fabricated profile

### Requirement: Profile header presents core identity and contact fields
The profile header SHALL display the developer's configured name, logo, slogan, address, website,
and social links; an optional field left unset in the centralized content source SHALL be omitted
from the header rather than rendered as a broken element (e.g. an empty link or missing-image
icon).

#### Scenario: Developer has full header data configured
- **WHEN** a developer's name, logo, slogan, address, website, and social links are all configured
- **THEN** the profile header displays all of them

#### Scenario: Developer is missing an optional header field
- **WHEN** a developer's centralized data has no value for an optional header field (e.g. no
  website or no social links)
- **THEN** the header omits that field's element instead of showing a broken link or empty icon

### Requirement: Profile video defers loading until the visitor initiates playback
When a developer has a configured video, the profile SHALL display its poster image on load and
SHALL NOT request or play the video until the visitor explicitly initiates playback.

#### Scenario: Visitor views a profile before interacting with its video
- **WHEN** the profile page loads and the developer has a configured video
- **THEN** only the poster image is shown and no video request is initiated automatically

#### Scenario: Developer has no configured video
- **WHEN** a developer's centralized data has no video configured
- **THEN** the profile omits the video section instead of showing an empty player

### Requirement: Narrative block presents description, mission, and vision
The profile SHALL display the developer's configured description, mission, and vision as
independent, individually optional fields; a field left unset SHALL be omitted without disrupting
the layout of the fields that are present.

#### Scenario: Developer has description, mission, and vision configured
- **WHEN** all three fields are configured
- **THEN** the profile displays all three

#### Scenario: Developer is missing mission or vision
- **WHEN** a developer's centralized data has no mission or no vision configured
- **THEN** the profile omits that field and displays the remaining configured fields normally

### Requirement: Representative block presents the configured spokesperson
When a developer has a configured representative, the profile SHALL display that person's name,
role/title, and quote or description; if the representative's photo is not configured, the
profile SHALL render a neutral placeholder in its place instead of a broken image.

#### Scenario: Developer has a fully configured representative
- **WHEN** a developer's representative has a name, role, quote, and photo configured
- **THEN** the profile displays all of them

#### Scenario: Representative photo is not configured
- **WHEN** a developer's representative has no photo configured
- **THEN** the profile shows a neutral placeholder instead of a missing or broken image

### Requirement: Added projects list shows this developer's linked projects
The profile SHALL list the projects associated with the developer via the project's
developer-linking slug (name, location, image, and "Ver proyecto" action per project); when the
developer has no linked projects, the profile SHALL omit the section rather than show it empty.

#### Scenario: Developer has one or more linked projects
- **WHEN** one or more projects in the centralized content source reference this developer's slug
- **THEN** the profile's added-projects section lists each of them

#### Scenario: Developer has no linked projects yet
- **WHEN** no project in the centralized content source references this developer's slug
- **THEN** the profile omits the added-projects section instead of showing it empty

### Requirement: Other-projects portfolio list is independently configurable
The profile SHALL support a separate, independently configured "other projects" list distinct
from the added-projects list; when not configured for a developer, the profile SHALL omit that
section.

#### Scenario: Developer has an other-projects list configured
- **WHEN** a developer's centralized data includes an other-projects list
- **THEN** the profile displays it as a section distinct from added projects

#### Scenario: Developer has no other-projects list configured
- **WHEN** a developer's centralized data has no other-projects list
- **THEN** the profile omits that section

### Requirement: Press notes are centrally configured and optional
When a developer has configured press notes, the profile SHALL display each note's outlet,
headline, and link; when none are configured, the profile SHALL omit the press section.

#### Scenario: Developer has press notes configured
- **WHEN** a developer's centralized data includes one or more press notes
- **THEN** the profile displays each note's outlet, headline, and link

#### Scenario: Developer has no press notes configured
- **WHEN** a developer's centralized data has no press notes
- **THEN** the profile omits the press section

### Requirement: Related links are centrally configured and optional
When a developer has configured related links, the profile SHALL display them; when none are
configured, the profile SHALL omit that section.

#### Scenario: Developer has related links configured
- **WHEN** a developer's centralized data includes one or more related links
- **THEN** the profile displays them

#### Scenario: Developer has no related links configured
- **WHEN** a developer's centralized data has no related links
- **THEN** the profile omits that section

### Requirement: Profile media reserves layout space before loading
Every image and video container on the profile SHALL reserve its final display space before its
media finishes loading, so that media loading does not shift surrounding content.

#### Scenario: Visitor views a profile on a slow connection
- **WHEN** the profile's images or video have not finished loading
- **THEN** their containers already occupy their final space and no layout shift occurs once the
  media loads
