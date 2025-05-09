# Figma Decimal Point Plugin

This Figma plugin identifies nodes in your design that use decimal points in their position or dimensions and adds a warning label to them. It helps ensure that all components are aligned to whole pixels for better design consistency.

## Features

- Detects nodes with decimal points in their `x`, `y`, `width`, or `height` properties.
- Adds a warning label to nodes with decimal points.
- Supports customization of warning box and text colors via the plugin UI.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-repo/figma-decimal-point.git
cd figma-decimal-point
```

2. Install dependencies:

```bash
npm install
```

3. Build the plugin:

```bash
npm run build
```

4. Open Figma, go to Plugins > Development > New Plugin, and select the manifest.json file from this project.

## Usage

1. Open the plugin in Figma.
2. Use the color pickers in the UI to customize the warning box and text colors (optional).
3. Click the Find button to scan your design for nodes with decimal points.
4. If any nodes with decimal points are found, a warning label will be added near them. If no issues are found, a notification will appear saying "Perfect components!"

## Development

Prerequisites

- Node.js (version 14.17 or higher)
- npm

Scripts

- npm run build: Builds the plugin for production.
- npm run watch: Watches for changes and rebuilds the plugin automatically.

File Structure

- code.ts: The main plugin logic.
- ui.tsx: The React-based UI for the plugin.
- manifest.json: Figma plugin configuration.
- package.json: Project dependencies and scripts.

## Dependencies

- @figma/plugin-typings: Type definitions for Figma plugins.
- TypeScript: Type-safe JavaScript.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
