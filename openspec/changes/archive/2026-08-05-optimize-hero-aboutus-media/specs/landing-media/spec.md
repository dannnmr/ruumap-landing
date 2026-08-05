## Purpose

Defines how the video content in the Ruum landing's Hero and About Us sections is configured,
loaded, and played, so it stays performant, accessible, and easy to replace as final assets
arrive.

## ADDED Requirements

### Requirement: Video content is centrally configured
The video source and its static fallback image for the Hero and for About Us SHALL be defined in
a centralized content source, not written directly inside the section's component.

#### Scenario: Replacing a video resource
- **WHEN** the video source or its fallback image is updated in the centralized content source
- **THEN** the corresponding section reflects the new resource without any change to the
  component's structure or markup

### Requirement: Static fallback shown before video playback
Each video section SHALL display a static fallback image in place of the video until the video has
rendered its first frame.

#### Scenario: Page loads before the video is ready
- **WHEN** a visitor loads the page and the video has not yet produced a visible frame
- **THEN** the section shows its static fallback image instead of an empty or blank area

### Requirement: Section content is understandable without video
The Hero's headline and calls to action, and About Us's heading and call to action, SHALL remain
meaningful and usable regardless of whether their video loads, plays, or fails.

#### Scenario: Video fails to load
- **WHEN** a video source fails to load or is unavailable
- **THEN** the section's text and calls to action are still fully readable and interactive

### Requirement: No layout shift from video loading
Loading or swapping the video or its fallback image SHALL NOT change the layout dimensions of the
Hero or About Us section.

#### Scenario: Video finishes loading after initial paint
- **WHEN** the video finishes loading and starts rendering frames after the page has already
  painted
- **THEN** the section's size and the position of surrounding content do not change

### Requirement: Autoplay respects reduced-motion preference
The Hero's video SHALL NOT autoplay when the visitor's system preference requests reduced motion.

#### Scenario: Visitor has reduced motion enabled
- **WHEN** a visitor with `prefers-reduced-motion: reduce` loads the page
- **THEN** the Hero's video does not autoplay, and the static fallback image is shown instead

### Requirement: Video does not autoplay where not appropriate
About Us's video SHALL only start playing in response to an explicit visitor action, never
automatically.

#### Scenario: About Us section enters the viewport
- **WHEN** the About Us section scrolls into view
- **THEN** its video remains paused until the visitor activates play

### Requirement: Video pauses when scrolled out of view
A playing video in the Hero or About Us SHALL pause once its section is no longer visible in the
viewport.

#### Scenario: Visitor scrolls the Hero out of view
- **WHEN** the Hero's video is playing and the visitor scrolls until the Hero is no longer visible
- **THEN** the video pauses

#### Scenario: Visitor scrolls the Hero back into view
- **WHEN** the Hero's video was paused because it left the viewport, and the Hero becomes visible
  again
- **THEN** the video resumes automatically, consistent with its ambient, always-on behavior

#### Scenario: Visitor scrolls away from a playing About Us video
- **WHEN** a visitor started About Us's video and then scrolls it out of view
- **THEN** the video pauses and does **not** resume automatically when it becomes visible again —
  it stays paused until the visitor explicitly presses play

### Requirement: Mobile-compatible inline playback
Both videos SHALL play inline on mobile devices, without forcing fullscreen presentation.

#### Scenario: Visitor on a mobile device plays a video
- **WHEN** a visitor on a mobile browser triggers video playback (autoplay for the Hero, or a tap
  for About Us)
- **THEN** the video plays inline within its section, not in a fullscreen player
