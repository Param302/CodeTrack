# CodeTrack

CodeTrack is a simple tool to visualize your GitHub contribution heatmap.

## Properties

### attributes
- `username`: Github username of the user.
- `width`: the width of the heatmap. It must be `800px` only.

#### optional
- `scale`: the scale of the heatmap. Defaults to `1`.
- `gap`: the gap between the squares in pixels. Defaults to `5`.
- `borderRadius`: the border radius of the squares in pixels. Defaults to `3`.
<!-- - `darkMode`: whether to use dark mode. Defaults to `true`.
- `colorScheme`: the color scheme to use. Defaults to `github`. -->
<!-- - `reverse`: whether to reverse the color scheme. Defaults to `false`. -->
- `theme`: the color theme to use. Example: `github-dark`, `github-light`, `github-dimmed`. Defaults to `github-dark`.
- `showProfileData`: whether to show the profile data (Pic & Name with github icon). Defaults to `true`.
- `showTotalContributions`: whether to show the total number of contributions. Defaults to `false`.
- `showTooltip`: whether to show the tooltip. Defaults to `false`.
- `showWeekdays`: whether to show the weekdays. Defaults to `false`.
- `showMonths`: whether to show the months. Defaults to `false`.
- `shareableSnapshot`: whether to show the shareable snapshot button. Defaults to `false`.