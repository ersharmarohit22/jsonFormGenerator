# JSON Form Builder

A modern, powerful tool for generating beautiful, validated forms from JSON schemas with exportable React code.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

- **📝 JSON Schema Input**: Paste or upload JSON schemas to define your forms
- **🎯 25+ Templates**: Pre-built form templates including grid layouts and styled examples
- **👁️ Live Preview**: See your form render in real-time as you edit
- **🎨 Custom Styling**: Full control over layout, colors, spacing, and field appearance
- **📐 Grid Layouts**: Create multi-column forms with 2+ inputs per row
- **🔍 Full-Size Modal**: View forms at original size in a modal overlay
- **📏 Matched Heights**: Preview box matches JSON editor height with scrolling
- **✅ Full Validation**: Support for required fields, min/max lengths, patterns, and more
- **💻 Multi-Framework Code Generation**: Export code for React, Vue, Angular, Remix, or vanilla JavaScript
- **📁 File Upload**: Drag & drop or upload JSON files
- **🎨 Theme Switcher**: Choose between Light, Grey, and Dark themes for the entire website
- **🌓 Dark Mode**: Beautiful dark mode support throughout
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **🚀 Fast**: Built with Next.js 14 and React Server Components

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

## 📋 JSON Schema Format

Create forms using simple JSON schemas:

```json
{
  "title": "Contact Form",
  "description": "Get in touch with us",
  "style": {
    "layout": "vertical",
    "spacing": "normal",
    "buttonAlignment": "full",
    "theme": {
      "buttonColor": "#6366f1",
      "buttonTextColor": "#ffffff"
    },
    "fieldStyle": {
      "borderRadius": "lg",
      "fieldHeight": "md"
    }
  },
  "fields": [
    {
      "id": "1",
      "name": "fullName",
      "label": "Full Name",
      "type": "text",
      "placeholder": "John Doe",
      "validation": {
        "required": true,
        "minLength": 2,
        "maxLength": 50
      }
    },
    {
      "id": "2",
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "placeholder": "john@example.com",
      "validation": {
        "required": true
      }
    }
  ]
}
```

### Styling Options

The `style` property lets you customize:
- **Layout**: `vertical`, `horizontal`, `grid` (1-4 columns)
- **Spacing**: `compact`, `normal`, `relaxed`
- **Label Position**: `top`, `left`, `floating`
- **Button Alignment**: `left`, `center`, `right`, `full`
- **Theme Colors**: Primary, button, focus colors
- **Field Style**: Border radius, width, height

See [`STYLING_GUIDE.md`](STYLING_GUIDE.md) for complete styling documentation.

## 🎯 Supported Field Types

- **Text Inputs**: `text`, `email`, `password`, `tel`, `url`, `number`
- **Multi-line**: `textarea`
- **Selection**: `select`, `radio`, `checkbox`
- **Date/Time**: `date`, `time`
- **File Upload**: `file`

## ✅ Validation Rules

- `required` - Make field mandatory
- `minLength` / `maxLength` - String length validation
- `min` / `max` - Number range validation
- `pattern` - Regex pattern matching
- Built-in validation for email and URL types

## 💻 Multi-Framework Code Generation

Generate production-ready code in your preferred framework:

### ⚛️ React
- Modern React 18 with hooks
- Client-side state management
- TypeScript support
- Tailwind CSS styling

### 💚 Vue 3
- Composition API with `<script setup>`
- Reactive state management
- TypeScript support
- Scoped styles

### 🅰️ Angular
- Standalone components
- Reactive Forms with validation
- TypeScript support
- Component architecture (TS, HTML, CSS)

### 💿 Remix
- Server-side form handling
- Progressive enhancement
- Action-based validation
- TypeScript support

### 📜 Vanilla JavaScript
- Pure HTML/CSS/JS
- No framework dependencies
- Embedded validation
- Works anywhere

### How to Use
1. Create your form using the JSON schema
2. Click the "Generated Code" tab
3. Select your preferred framework
4. Copy the generated code
5. Paste into your project!

## 💻 Generated Code Example (React)

The tool generates clean, production-ready components:

```typescript
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  })
  
  // ... validation and submit logic
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Generated form fields */}
    </form>
  )
}
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/             # React components
│   │   ├── FormRenderer.tsx
│   │   ├── FormFieldComponent.tsx
│   │   ├── JSONEditor.tsx
│   │   ├── CodePreview.tsx
│   │   └── Navigation.tsx
│   ├── lib/                    # Utilities
│   │   ├── validation.ts
│   │   ├── codeGenerator.ts
│   │   ├── schemaParser.ts
│   │   └── utils.ts
│   └── types/                  # TypeScript types
│       └── index.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Features in Detail

### JSON Editor
- Paste JSON directly
- Drag & drop JSON files
- Upload from file system
- Real-time syntax validation
- Clear error messages

### Form Preview
- Instant rendering
- Full validation feedback
- All field types supported
- Responsive design
- Dark mode ready

### Code Generator
- Clean React/TypeScript code
- Includes validation logic
- Modern styling with Tailwind
- Copy to clipboard
- Production-ready

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

## 🤝 Use Cases

- **Rapid Prototyping**: Quickly create forms from specifications
- **Form Documentation**: Generate forms from API schemas
- **Client Demos**: Show form mockups instantly
- **Code Generation**: Export forms as React components
- **Learning Tool**: Understand form validation patterns

## 📝 Example Templates (25+ Ready-Made Forms)

The app includes professionally designed templates for common use cases:

### 📐 Grid Layouts (2 Inputs Per Row - NEW!)
- **Two-Column Contact Form** - Classic contact form with 2-column grid
- **Payment Form** - Credit card details with compact 2-column layout
- **Employee Information Grid** - HR form with compact spacing
- **Shipping Address Grid** - E-commerce shipping with amber theme
- **Dark Profile Grid** - Profile form with dark theme and relaxed spacing

### 🎨 Styled Forms
- **Modern Indigo Theme** - Beautiful indigo colors with relaxed spacing
- **Compact Grid Layout** - Two-column grid with green accents
- **Minimal Black & White** - Clean design with pill-shaped fields
- **Colorful Purple Theme** - Vibrant purple with large fields
- **Tech Blue Theme** - Professional cyan accents for tech forms
- **Survey with Radio Buttons** - Orange theme with satisfaction ratings
- **Booking Form with Dates** - Teal theme with date/time pickers
- **Dark Background Theme** - Dark slate with amber accents
- **Soft Pastel Theme** - Light pink background with event registration
- **Earth Green Theme** - Eco-friendly green with sustainability survey

### Contact & Communication
- **Contact Form** - Basic contact form with subject selection
- **Newsletter Signup** - Email subscription with preferences

### Registration & Events
- **User Registration** - Complete signup with password and profile
- **Event Registration** - Conference/event booking with ticket types

### Business & Professional
- **Job Application** - Employment form with file upload
- **Appointment Booking** - Schedule meetings with date/time
- **Support Ticket** - Technical support request form

### Feedback & Reviews
- **Customer Feedback** - Feedback collection with ratings
- **Product Review** - Detailed product reviews with ratings
- **Customer Survey** - Market research and satisfaction surveys

Click "Load Example" button to browse and select any template! Filter by "🎨 Styled Forms" to see styling examples.

## 🔧 Development

```bash
# Run development server
npm run dev

# Type check
npm run type-check

# Lint code
npm run lint

# Build for production
npm run build
```

## 🎯 Roadmap

- [ ] More field types (multi-select, date range, color picker)
- [ ] Conditional field logic
- [ ] Form templates library
- [ ] Export to multiple frameworks (Vue, Angular)
- [ ] Import from OpenAPI/Swagger specs
- [ ] Form analytics and tracking

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

Built with modern web technologies and best practices. Perfect for developers who need to generate forms quickly and efficiently.

---

**Made with ❤️ using Next.js, React, and TypeScript**

*Transform JSON schemas into beautiful forms in seconds!*
