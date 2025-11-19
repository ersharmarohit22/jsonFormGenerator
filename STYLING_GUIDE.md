# Form Styling Guide

The JSON Form Builder supports comprehensive styling through the `style` property in your JSON schema. This guide shows you how to customize every aspect of your form's appearance.

## Basic Structure

```json
{
  "title": "My Form",
  "description": "Form description",
  "style": {
    // Styling options go here
  },
  "fields": [
    // Your fields
  ]
}
```

## Styling Options

### Layout

Control how your form fields are arranged:

```json
{
  "style": {
    "layout": "vertical",  // Options: "vertical", "horizontal", "grid"
    "columns": 2,          // Only for grid layout (1-4)
    "spacing": "normal"    // Options: "compact", "normal", "relaxed"
  }
}
```

**Examples:**

**Vertical Layout** (default):
```json
{
  "layout": "vertical",
  "spacing": "normal"
}
```

**Grid Layout** (2 columns):
```json
{
  "layout": "grid",
  "columns": 2,
  "spacing": "compact"
}
```

#### Grid Layout Tips

When using `"layout": "grid"`, your form fields will automatically arrange into the specified number of columns (2 by default on desktop, 1 on mobile).

**Best Use Cases:**
- **Contact Forms**: First name, last name side-by-side
- **Address Forms**: City and state, zip and country pairs
- **Payment Forms**: Card details, expiry and CVV pairs
- **Employee/User Profiles**: Multiple related fields in rows
- **Shipping Information**: Address fields in compact 2-column layout

**Example Grid Form:**
```json
{
  "title": "Contact Information",
  "style": {
    "layout": "grid",
    "columns": 2,
    "spacing": "normal"
  },
  "fields": [
    { "id": "1", "name": "firstName", "label": "First Name", "type": "text" },
    { "id": "2", "name": "lastName", "label": "Last Name", "type": "text" },
    { "id": "3", "name": "email", "label": "Email", "type": "email" },
    { "id": "4", "name": "phone", "label": "Phone", "type": "tel" }
  ]
}
```

This creates a form where firstName and lastName appear side-by-side, and email and phone appear in the next row.

**Spacing Options for Grid:**
- `"compact"` - Tight spacing, more fields visible
- `"normal"` - Balanced spacing (recommended)
- `"relaxed"` - More breathing room, cleaner look

### Label Position

Control where field labels appear:

```json
{
  "style": {
    "labelPosition": "top"  // Options: "top", "left", "floating"
  }
}
```

- **`top`** - Labels above fields (default)
- **`left`** - Labels beside fields (horizontal)
- **`floating`** - Material Design style floating labels

### Button Alignment

Control submit button placement:

```json
{
  "style": {
    "buttonAlignment": "full"  // Options: "left", "center", "right", "full"
  }
}
```

- **`left`** - Aligns to left
- **`center`** - Centers the button
- **`right`** - Aligns to right
- **`full`** - Full width button (default)

### Theme Colors

Customize colors throughout your form:

```json
{
  "style": {
    "theme": {
      "primaryColor": "#6366f1",
      "backgroundColor": "#ffffff",
      "borderColor": "#e5e7eb",
      "textColor": "#111827",
      "buttonColor": "#6366f1",
      "buttonTextColor": "#ffffff",
      "focusColor": "#6366f1"
    }
  }
}
```

### Field Styling

Customize field appearance:

```json
{
  "style": {
    "fieldStyle": {
      "borderRadius": "md",     // Options: "none", "sm", "md", "lg", "full"
      "borderWidth": "normal",  // Options: "thin", "normal", "thick"
      "fieldHeight": "md"       // Options: "sm", "md", "lg"
    }
  }
}
```

**Border Radius Options:**
- `none` - No rounding
- `sm` - Small rounding
- `md` - Medium rounding (default)
- `lg` - Large rounding
- `full` - Fully rounded (pill shape)

**Field Height Options:**
- `sm` - Compact fields
- `md` - Normal height (default)
- `lg` - Larger fields

## Complete Examples

### Modern Indigo Theme

```json
{
  "title": "Contact Us",
  "description": "Get in touch with our team",
  "style": {
    "layout": "vertical",
    "spacing": "relaxed",
    "buttonAlignment": "full",
    "theme": {
      "buttonColor": "#6366f1",
      "buttonTextColor": "#ffffff",
      "focusColor": "#6366f1"
    },
    "fieldStyle": {
      "borderRadius": "lg",
      "borderWidth": "normal",
      "fieldHeight": "lg"
    }
  },
  "fields": [
    {
      "id": "1",
      "name": "name",
      "label": "Your Name",
      "type": "text",
      "placeholder": "John Doe",
      "validation": { "required": true }
    },
    {
      "id": "2",
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "placeholder": "john@example.com",
      "validation": { "required": true }
    },
    {
      "id": "3",
      "name": "message",
      "label": "Message",
      "type": "textarea",
      "placeholder": "Your message...",
      "validation": { "required": true }
    }
  ]
}
```

### Compact Grid Layout

```json
{
  "title": "Quick Signup",
  "style": {
    "layout": "grid",
    "columns": 2,
    "spacing": "compact",
    "buttonAlignment": "right",
    "fieldStyle": {
      "borderRadius": "md",
      "fieldHeight": "sm"
    }
  },
  "fields": [
    {
      "id": "1",
      "name": "firstName",
      "label": "First Name",
      "type": "text",
      "validation": { "required": true }
    },
    {
      "id": "2",
      "name": "lastName",
      "label": "Last Name",
      "type": "text",
      "validation": { "required": true }
    },
    {
      "id": "3",
      "name": "email",
      "label": "Email",
      "type": "email",
      "validation": { "required": true }
    },
    {
      "id": "4",
      "name": "phone",
      "label": "Phone",
      "type": "tel"
    }
  ]
}
```

### Minimal Black & White

```json
{
  "title": "Newsletter Signup",
  "style": {
    "layout": "vertical",
    "spacing": "normal",
    "buttonAlignment": "center",
    "theme": {
      "buttonColor": "#000000",
      "buttonTextColor": "#ffffff"
    },
    "fieldStyle": {
      "borderRadius": "full",
      "borderWidth": "thin",
      "fieldHeight": "md"
    }
  },
  "fields": [
    {
      "id": "1",
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "placeholder": "you@example.com",
      "validation": { "required": true }
    }
  ]
}
```

### Horizontal Form

```json
{
  "title": "Login",
  "style": {
    "layout": "vertical",
    "labelPosition": "left",
    "spacing": "normal",
    "buttonAlignment": "full",
    "theme": {
      "buttonColor": "#10b981",
      "buttonTextColor": "#ffffff"
    },
    "fieldStyle": {
      "borderRadius": "md"
    }
  },
  "fields": [
    {
      "id": "1",
      "name": "email",
      "label": "Email",
      "type": "email",
      "validation": { "required": true }
    },
    {
      "id": "2",
      "name": "password",
      "label": "Password",
      "type": "password",
      "validation": { "required": true }
    }
  ]
}
```

## Tips & Best Practices

### Color Selection
- Use hex color codes (#RRGGBB) for consistency
- Ensure sufficient contrast for accessibility
- Keep buttonColor and focusColor similar for cohesion

### Layout Choices
- Use `vertical` for forms with many fields
- Use `grid` for forms with even numbers of short fields
- Use `horizontal` (via labelPosition: "left") for compact forms

### Spacing
- `compact` - Best for forms with many fields in limited space
- `normal` - Good default for most forms
- `relaxed` - Best for forms with few fields or when space isn't an issue

### Border Radius
- `full` - Modern, friendly appearance (best for buttons and short inputs)
- `lg` - Soft, approachable feel
- `md` - Professional, balanced (default)
- `sm` or `none` - Formal, traditional look

### Field Height
- `sm` - Compact forms, many fields
- `md` - Standard, works for most cases (default)
- `lg` - Better touch targets, modern feel

## Generated Code

The styling you define in JSON is automatically converted to Tailwind CSS classes and inline styles in the generated React code. All styling is preserved in the export!

## Need Help?

- Check the example templates in the app (Load Example button)
- Experiment with different combinations
- Use the live preview to see changes instantly
- Export the code to see how styles are implemented

---

**Happy Styling!** 🎨

