# 🛠️ Design Token Name Generator

A browser-based web tool that helps users generate design system token names by allowing them to define naming buckets and generating token name combinations using a customizable naming convention.

## Features

- **Dynamic Token Generation**: Create token names using customizable naming buckets
- **Flexible Configuration**: Add, remove, rename, and reorder naming buckets
- **Multiple Export Formats**: Export your tokens as CSV, JSON, XLS, or PDF
- **URL-based State Management**: Share your configurations via URL - all state is preserved in the URL
- **Responsive Design**: Works on desktop and mobile devices
- **Copy to Clipboard**: Easily copy individual token names or share URLs

## Default Configuration

The tool comes with three default naming buckets:
- **Context**: button, input, card
- **Scope**: primary, secondary, danger  
- **Modifier**: hover, active, disabled

These generate tokens like: `button-primary-hover`, `input-secondary-active`, etc.

## Usage

1. **Configure Token Type**: Choose from common types (color, spacing, typography) or enter a custom type
2. **Set Delimiter**: Customize the character used to join token parts (default: `-`)
3. **Manage Buckets**: 
   - Add new buckets using the "Add Bucket" button
   - Rename buckets by clicking on their names
   - Reorder buckets using the up/down arrows
   - Remove buckets using the × button
   - Add values to buckets and remove them as needed
4. **View Generated Tokens**: All possible combinations appear in the table
5. **Export**: Choose your preferred format (CSV, JSON, XLS, PDF)
6. **Share**: Copy the URL to share your configuration with others

## Technical Implementation

- **Framework**: React with TypeScript
- **State Management**: URL-based state persistence
- **Export Libraries**: 
  - CSV/XLS: SheetJS
  - JSON: Native JSON.stringify
  - PDF: jsPDF
- **Styling**: Custom CSS with responsive design

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner

### Project Structure

```
src/
├── components/           # React components
│   ├── BucketConfigurator.tsx
│   ├── ExportButtons.tsx
│   ├── TokenTable.tsx
│   └── TokenTypeInput.tsx
├── utils/               # Utility functions
│   ├── exportUtils.ts
│   ├── tokenGenerator.ts
│   └── urlState.ts
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── App.css             # Styling
```

## Deployment

The application is built as a static site and can be deployed to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

Build the project with `npm run build` and deploy the contents of the `build` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).