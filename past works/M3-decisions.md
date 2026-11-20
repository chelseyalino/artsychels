# M3 Design Decisions

## Design Tokens

My stylesheet uses CSS custom properties in `:root` to keep the design consistent and make the colors, spacing, and typography easier to manage.

### Colors

- `--pink: #f3c6cf` - Used as the main soft pink accent.
- `--light-pink: #fdf3f5` - Used as a light background color.
- `--green: #a8b58a` - Used as the main pastel green accent.
- `--light-green: #e8eddc` - Used for lighter backgrounds and borders.
- `--brown: #6b4f3a` - Used for headings, buttons, and other accent elements.
- `--dark-brown: #4d382a` - Used as the main dark text color.
- `--white: #ffffff` - Used for cards, buttons, and other light elements.

Using color tokens allows the same colors to be reused throughout the four pages instead of repeatedly writing the same hex values.

### Spacing

- `--space-small: 8px`
- `--space-medium: 16px`
- `--space-large: 24px`
- `--space-xl: 40px`

These tokens create a simple spacing scale that keeps the spacing between elements consistent.

### Typography

- `--text-small: 14px`
- `--text-normal: 16px`
- `--text-large: 24px`
- `--text-xl: 36px`

The typography tokens provide consistent text sizes for different levels of content.

## AI Design Decisions

### Arguments I Accepted

I accepted the AI's argument that the stylesheet provides a consistent visual design across all four pages. The AI uses consistent colors, typography, cards, buttons, spacing, and responsive layouts. I also accepted its argument that several responsive features work at 320px. The navigation wraps, the homepage changes to a single-column layout, the image becomes smaller, the skills table can scroll horizontally, and the contact form remains usable.

I also accepted the AI's observation that the About page grid is tight at 320px. However, I treated this as an observation rather than a confirmed layout failure because the testing did not show that the page actually breaks or becomes unusable.

### Arguments I Rejected

I rejected the AI's claim that every contrast test passed. The measurements showed several contrast failures in the AI-generated stylesheet, including white on `#ff9fc5` at 1.91:1, `#ff69a6` on white at 2.68:1, and white on `#ff69a6` at 2.68:1. These values are below the 4.5:1 WCAG AA requirement for body text.

I also rejected the conclusion that these results prove the AI stylesheet fully meets accessibility requirements. Although several accessibility and responsive features worked correctly, the contrast failures mean that the accessibility claim was not completely supported by the measurements.

## Final Decision

After comparing the AI-generated stylesheet with my existing stylesheet and testing the results, I decided to keep my existing `style.css` without making unnecessary changes. The contrast problems identified were present in the AI-generated stylesheet, while the color combinations in my existing stylesheet passed the contrast tests. The responsive features of my stylesheet also functioned as intended. Therefore, I only accepted AI arguments that were supported by the testing results and rejected claims that contradicted the measurements.