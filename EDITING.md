# Editing the one-page website

The homepage uses Jekyll, Markdown, and plain CSS. It uses a small optional script to load research videos on click, and needs no external fonts or client-side framework. GitHub Pages remains the host.

## Introduction and about section

Edit `_pages/about.md`. The YAML at the top controls the headline, introduction, affiliation, and location. The Markdown below it appears in the About section. Contact and social links use the existing `author` values in `_config.yml`.

## Research projects

Each project is a Markdown file in `_research/`. To add one, copy an existing file, give it a unique `slug`, and change the content. These files are embedded in the homepage; they do not generate separate project pages.

- `title`: the project heading.
- `summary`: a short description visible before expansion.
- `category` and `year`: the small label above the heading; quote years.
- `order`: the display order within the featured or regular group.
- `featured: true`: use a larger image-led card. Omit for regular cards.
- `image`: filename in `assets/images/research/`.
- `image_alt`: a useful description of the image.
- `video`: optional link to a demonstration, loaded only after a visitor follows it.

Write the full description, publication links, and citations in Markdown below the YAML. They appear inside the accessible “Explore project” disclosure, on the same page. All original research descriptions and citation links have been retained.

Use small WebP previews instead of animated GIFs or full-resolution figures. The original files remain available. Link to large videos and animations using `video`, rather than embedding them in the initial page.

## Layout and appearance

- `_layouts/home.html`: homepage structure and prominent portrait.
- `_includes/research-details.html`: expandable Markdown content.
- `assets/css/home.css`: colors, spacing, typography, and mobile layouts.

The font stack uses Avenir Next when available, then Segoe UI, Candara, or Trebuchet MS. No web font download is needed. The header links scroll to sections; the CV opens the existing PDF. Existing CV and legal page URLs continue to work.

## Build

Use the repository's existing Jekyll environment:

```sh
bundle install
bundle exec jekyll serve
```

The redesign's pull-request workflow builds with GitHub's Jekyll Pages action and uploads the generated site for review. It does not deploy or change the live site.

## Current research and project media

Edit `_data/current_research.yml` for the short descriptions of work in progress. Keep these high level; unpublished manuscripts and detailed theory are intentionally not linked or reproduced.

`legacy: true` places a project in the smaller earlier-software area. `youtube` holds an existing YouTube video ID, while `video_file` is a local MP4 URL. Use an image URL or a local preview filename for `image`. Players load only on click; without JavaScript the preview remains an ordinary link to the original demonstration. Original full-resolution figures can be linked with `image_full`.

## Color themes

Dark is the default. The header's Light/Dark button saves the visitor's choice in their browser. Both palettes are defined as CSS variables in `home.css`; `assets/js/theme.js` controls the toggle. The portrait is a prominent part of the introduction, with the graphical abstract retained below it.
