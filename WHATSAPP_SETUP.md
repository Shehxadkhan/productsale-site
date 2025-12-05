# WhatsApp Button Setup

The WhatsApp button is now visible on the bottom right of all pages.

## How to Configure Your WhatsApp Number

1. **Open `app/layout.tsx`**

2. **Find the WhatsAppButton component** and update the `phoneNumber` prop:

```tsx
<WhatsAppButton 
  phoneNumber="1234567890"  // ← Change this to your WhatsApp number
  message="Hello! I'm interested in your products. Can you help me?"
/>
```

3. **Phone Number Format:**
   - Use country code + number (no + sign, no spaces, no dashes)
   - Example: `1234567890` (US number)
   - Example: `919876543210` (India: 91 is country code)
   - Example: `447911123456` (UK: 44 is country code)

4. **Customize the Message:**
   - Change the `message` prop to customize the pre-filled message
   - This is the message that will appear when users click the button

## Examples:

**US Number:**
```tsx
phoneNumber="1234567890"
```

**India Number:**
```tsx
phoneNumber="919876543210"
```

**UK Number:**
```tsx
phoneNumber="447911123456"
```

## Features:

- ✅ Fixed position on bottom right
- ✅ Hover tooltip
- ✅ WhatsApp green color (#25D366)
- ✅ Smooth animations
- ✅ Opens in new tab
- ✅ Pre-filled message

The button will appear on all pages of your website!

