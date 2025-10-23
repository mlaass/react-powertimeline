# Release Command

Execute a comprehensive release workflow for react-powertimeline following semantic versioning.

## Your Task

Guide the user through creating a new release by:

1. **Pre-flight checks**:
   - Verify git status is clean (no uncommitted changes)
   - Run linter: `bun run lint`
   - Run tests: `bun test`
   - Build package: `bun run build`

2. **Version bump**:
   - Ask user which version type to bump:
     - **patch** (0.1.0 → 0.1.1): Bug fixes, small improvements
     - **minor** (0.1.0 → 0.2.0): New features, backward compatible
     - **major** (0.1.0 → 1.0.0): Breaking changes
   - Update version in package.json using: `npm version [patch|minor|major] --no-git-tag-version`

3. **Changelog update**:
   - Check if CHANGELOG.md exists, create if missing
   - Prompt user to add entry for the new version following [Keep a Changelog](https://keepachangelog.com/) format:
     ```markdown
     ## [X.Y.Z] - YYYY-MM-DD
     ### Added
     - New features
     ### Changed
     - Changes in existing functionality
     ### Fixed
     - Bug fixes
     ```
   - After user updates CHANGELOG.md, verify they're ready to proceed

4. **Git commit and tag**:
   - Stage changes: `git add package.json CHANGELOG.md bun.lockb`
   - Create commit: `git commit -m "chore: release vX.Y.Z"`
   - Create git tag: `git tag vX.Y.Z`
   - Push changes: `git push && git push --tags`

5. **Final build and publish instructions**:
   - Run final build: `bun run build`
   - Show npm publish instructions:
     ```
     # Test the package locally first
     npm pack

     # Dry run to verify what will be published
     npm publish --dry-run

     # When ready, publish to npm
     npm publish
     ```

## Important Notes

- NEVER auto-publish to npm - always show manual instructions
- If any pre-flight check fails, stop and report the error
- Always create git commits without attribution (per project guidelines)
- Ensure all changes are committed before creating the release tag
- Follow semantic versioning strictly:
  - Patch: backward compatible bug fixes
  - Minor: backward compatible new features
  - Major: breaking changes

## Error Handling

- If git status is dirty, ask user to commit or stash changes first
- If tests fail, stop and ask user to fix them
- If build fails, stop and ask user to fix build errors
- If CHANGELOG.md is not updated, remind user before proceeding
