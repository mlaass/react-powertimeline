# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PowerTimeline is a high-performance React component library for visualizing multi-layered time-series data. Built with React 18, D3.js 7.x, and TypeScript 5.2+, targeting 60fps interactions with 10k+ data points.

## Commands

### Development
```bash
npm run dev              # Start Vite dev server (http://localhost:5173)
npm run build            # Build library (tsc + vite build)
npm run typecheck        # Run TypeScript compiler without emitting files
```

### Testing
```bash
npm test                 # Run Vitest in watch mode
npm run test:ui          # Run Vitest with UI
npm run test:coverage    # Generate coverage report
npm run test:visual      # Run Playwright visual tests
```

### Linting & Formatting
```bash
npm run lint             # Lint TypeScript files with ESLint
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting without modifying
```

### Storybook & Examples
```bash
npm run storybook        # Start Storybook on port 6006
npm run examples         # Run examples server
npm run examples:basic   # Run specific example
```

### Release Management
```bash
/release                 # Execute release workflow (version bump, changelog, git tag, npm publish prep)
npm run release:check    # Run all quality gates (lint, test, build)
npm version patch        # Bump patch version (0.1.0 → 0.1.1) for bug fixes
npm version minor        # Bump minor version (0.1.0 → 0.2.0) for new features
npm version major        # Bump major version (0.1.0 → 1.0.0) for breaking changes
```

## Architecture

### Core Component Hierarchy
- **PowerTimeline** (src/components/PowerTimeline/PowerTimeline.tsx) - Main orchestrator component that manages lanes, items, virtualization, zoom/pan, and accessibility
- **Lane** (src/components/Lane/) - Individual horizontal lanes that render items
- **TimelineAxis** (src/components/TimelineAxis/) - Time axis with D3-based tick generation
- **Item Components** (src/components/items/)
  - EventItem: Point-in-time markers (circle, square, triangle, diamond)
  - TimeRangeItem: Duration-based horizontal bars
  - CurveItem: Time-series data as connected line segments

### Key Hooks
- **useTimeScale** (src/hooks/useTimeScale.ts) - D3 scaleTime wrapper for time-to-pixel conversion
- **useD3Zoom** (src/hooks/useD3Zoom.ts) - Pan/zoom interaction handling using d3-zoom
- **useVirtualization** (src/hooks/useVirtualization.ts) - Viewport-based item culling for performance

### Data Flow
1. PowerTimeline receives `lanes` (config) and `items` (data) as props
2. useTimeScale creates D3 scale mapping TimeRange → pixel coordinates
3. useVirtualization filters items to only those in buffered viewport
4. Items grouped by laneId via `groupItemsByLane()`
5. Each Lane receives filtered items and renders appropriate item components
6. D3 zoom behavior attached to container manages pan/zoom interactions

### Type System
All types exported from src/types/index.ts:
- **Item Types**: CurveItem, EventItem, TimeRangeItem (discriminated union by `type` field)
- **Configuration**: Lane, TimeRange, PowerTimelineProps
- **Internal**: VirtualizationState, Viewport, TimeScale

### Performance Strategy
- **Virtualization**: Only render items within visible time range + buffer zone (default 0.5)
- **Grouping**: Items pre-grouped by laneId for efficient lane rendering
- **Memoization**: Key computations memoized in hooks
- **Target**: <100ms initial render for 10k items, 60fps pan/zoom

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation via arrow keys, +/-, Home/End
- Screen reader support via FocusManager and ScreenReaderAnnouncer utils
- ARIA labels and descriptions generated dynamically

## Testing Strategy

### Contract Tests
Contract tests validate component interfaces and prop contracts without implementation details. Located in `tests/components/*.contract.test.tsx`:
- Verify required props and type safety
- Test basic rendering and prop passing
- Validate TypeScript interfaces match runtime behavior

### Unit Tests
Unit tests cover utility functions and isolated logic in `tests/utils/*.test.ts`:
- timeScale.ts: D3 scale creation and conversions
- virtualization.ts: Item filtering and grouping logic
- curveInterpolation.ts: D3 curve generator setup

### Running Specific Tests
```bash
npm test -- PowerTimeline  # Run PowerTimeline tests only
npm test -- timeScale      # Run time scale tests only
```

## Release Workflow

### When to Create a Release
- **Patch Version** (0.1.X): Bug fixes, documentation updates, small improvements
- **Minor Version** (0.X.0): New features, backward-compatible enhancements
- **Major Version** (X.0.0): Breaking changes, major API changes

### Release Process
1. Use `/release` command to start the release workflow
2. The command will:
   - Verify git status is clean
   - Run all quality gates (lint, test, build)
   - Prompt for version bump type (patch/minor/major)
   - Update package.json version
   - Prompt to update CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/) format
   - Create git commit and tag
   - Push changes and tags to remote
   - Show manual npm publish instructions

### CHANGELOG.md Format
Use [Keep a Changelog](https://keepachangelog.com/) format:
```markdown
## [X.Y.Z] - YYYY-MM-DD
### Added
- New features

### Changed
- Changes in existing functionality

### Fixed
- Bug fixes
```

### Manual Publishing
After `/release` completes, manually publish to npm:
```bash
npm pack                  # Test package locally
npm publish --dry-run     # Verify what will be published
npm publish               # Publish to npm registry
```

## Important Notes

- **Path Alias**: `@/` maps to `./src/` (configured in tsconfig.json and vite.config.ts)
- **External Dependencies**: React, React-DOM, and all D3 packages are externalized in build (peerDependencies)
- **Bundle Target**: ES2020 for modern browsers, tree-shaking enabled
- **Strict Mode**: TypeScript strict mode is DISABLED (`strict: false` in tsconfig.json) - be aware when making changes
- **Item Type Discrimination**: Always check `item.type` before accessing type-specific properties (e.g., `time` vs `startTime/endTime` vs `dataPoints`)
- **D3 Selection Usage**: D3 is used selectively - only for scales, axes, zoom behavior, and shape generators. React handles all rendering.
- **Git Commits**: Never add attribution to git commits (per project guidelines)
