# Theme Switcher Guide

The JSON Form Builder now includes a comprehensive theme switcher that allows users to customize the entire website's appearance. Choose from three beautiful themes: **Light**, **Grey**, and **Dark**.

## 🎨 Available Themes

### 1. Light Theme (Default)
- Clean white background with subtle gray gradients
- Perfect for bright environments and extended reading
- High contrast text for excellent readability
- Color scheme: White background, dark text, vibrant accents

### 2. Grey Theme
- Medium grey tones for reduced eye strain
- Balanced contrast between light and dark
- Great for long coding sessions
- Color scheme: Grey background, dark text, saturated accents

### 3. Dark Theme
- Deep dark background with light text
- Ideal for low-light environments
- Reduces eye fatigue in dim settings
- Color scheme: Dark slate background, light text, bright accents

## 🔧 How to Use

### User Interface
1. Look for the theme switcher in the navigation bar (top-right corner)
2. Click on your preferred theme: **Light**, **Grey**, or **Dark**
3. The theme changes instantly across the entire application
4. Your preference is automatically saved to localStorage

### Theme Persistence
- Your theme choice is **automatically saved** in the browser
- When you return to the site, your selected theme is restored
- Each browser/device maintains its own theme preference

## 💻 Technical Implementation

### For Developers

The theme system is built using React Context and CSS variables:

#### 1. Theme Context
```typescript
import { useTheme } from '@/contexts/ThemeContext'

function MyComponent() {
  const { theme, setTheme } = useTheme()
  
  // Get current theme: 'light' | 'grey' | 'dark'
  console.log(theme)
  
  // Change theme
  setTheme('dark')
}
```

#### 2. Tailwind CSS Classes
Use the `grey:` variant alongside `dark:` for styling:

```tsx
<div className="
  bg-white 
  dark:bg-gray-900 
  grey:bg-gray-300
  text-gray-900 
  dark:text-gray-100 
  grey:text-gray-900
">
  Content
</div>
```

#### 3. CSS Variables
Themes are applied via CSS classes on the `<html>` element:

```css
/* Light Theme */
.light {
  --foreground-rgb: 17, 24, 39;
  --background-start-rgb: 249, 250, 251;
  --background-end-rgb: 255, 255, 255;
}

/* Grey Theme */
.grey {
  --foreground-rgb: 31, 41, 55;
  --background-start-rgb: 156, 163, 175;
  --background-end-rgb: 209, 213, 219;
}

/* Dark Theme */
.dark {
  --foreground-rgb: 243, 244, 246;
  --background-start-rgb: 17, 24, 39;
  --background-end-rgb: 31, 41, 55;
}
```

### Adding Theme Support to Components

When creating new components, add grey theme variants:

```tsx
// Example: Button with theme support
<button className="
  px-4 py-2 rounded-lg
  bg-blue-600 hover:bg-blue-700
  dark:bg-blue-500 dark:hover:bg-blue-600
  grey:bg-blue-700 grey:hover:bg-blue-800
  text-white
">
  Click Me
</button>
```

### Common Patterns

#### Background Colors
```tsx
className="
  bg-white 
  dark:bg-gray-900 
  grey:bg-gray-200
"
```

#### Text Colors
```tsx
className="
  text-gray-900 
  dark:text-gray-100 
  grey:text-gray-800
"
```

#### Border Colors
```tsx
className="
  border-gray-300 
  dark:border-gray-700 
  grey:border-gray-400
"
```

#### Accent Colors
```tsx
className="
  text-blue-600 
  dark:text-blue-400 
  grey:text-blue-700
"
```

## 🎯 Best Practices

### 1. Consistent Color Mapping
- Light theme: Use standard Tailwind colors (e.g., `gray-900` for text)
- Dark theme: Use lighter variants (e.g., `gray-100` for text)
- Grey theme: Use medium-dark variants (e.g., `gray-800` for text)

### 2. Accessibility
- Maintain sufficient contrast ratios in all themes
- Test text readability in each theme
- Ensure interactive elements are clearly visible

### 3. Testing
- Always test your components in all three themes
- Check for color contrast issues
- Verify that all text remains readable

## 📱 Mobile Support

The theme switcher is fully responsive:
- On desktop: Shows icons + labels
- On mobile: Shows icons only to save space
- Touch-friendly button sizes
- Smooth transitions between themes

## 🔄 System Preference Detection

On first visit, the theme automatically detects your system preference:
- If your OS is set to dark mode → Dark theme
- If your OS is set to light mode → Light theme
- After manual selection, your choice overrides system preference

## 🚀 Performance

- Theme changes are instant with CSS classes
- No page reload required
- Minimal JavaScript overhead
- localStorage for persistence (< 1KB)

## 🎨 Customization

To modify theme colors, edit:
- `src/app/globals.css` - CSS variables and class-based theme styles
- `tailwind.config.ts` - Tailwind configuration for the grey variant
- `src/contexts/ThemeContext.tsx` - Theme logic and persistence

## 📚 Additional Resources

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [React Context API](https://react.dev/reference/react/useContext)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

---

**Need help?** Check the source code in:
- `src/contexts/ThemeContext.tsx` - Theme provider
- `src/components/ThemeSwitcher.tsx` - Theme UI component
- `src/app/globals.css` - Theme styles

