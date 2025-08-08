# SenCommerce Email Templates

This folder contains email templates and components specifically designed for SenCommerce (shop@sen.studio), exported from the SenDev email system.

## 📁 Folder Structure

```
sencommerce/
├── components/
│   ├── base-layout.tsx       # Reusable email layout wrapper
│   ├── email-styles.tsx      # Shared styling constants and utilities
│   └── signature.tsx         # SenCommerce-specific signature
├── order-confirmation.tsx    # Order confirmation email
├── shipping-notification.tsx # Shipping notification email
├── welcome-email.tsx        # Welcome/registration email
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Primary**: Orange (#f97316 - orange-500)
- **Secondary**: Blue (#3b82f6 - blue-500)
- **Text Colors**: Gray scale (gray-900 to gray-400)
- **Background Colors**: Orange-50, Blue-50, Gray-50

### Typography
- **Font**: Inter (font-sans)
- **Sizes**: xs, sm, base, lg, xl, 2xl
- **Weights**: light, normal, medium, semibold, bold

### Components
- **Cards**: Primary (orange-50), Secondary (blue-50), Neutral (gray-50)
- **Buttons**: Primary (orange), Secondary (gray), Outline
- **Links**: Primary (orange-500), Underlined

## 🧩 Components

### BaseEmailLayout
Reusable layout wrapper for all SenCommerce emails.

```tsx
import BaseEmailLayout from './components/base-layout'

<BaseEmailLayout
  previewText="Your preview text here"
  title="Email Title"
  logoUrl="https://shop.sen.studio/logo.svg"
  logoAlt="SenCommerce"
>
  {/* Your email content */}
</BaseEmailLayout>
```

### SenCommerceSignature
Professional signature with complete company information.

```tsx
import SenCommerceSignature from './components/signature'

<SenCommerceSignature />
```

### Email Styles
Centralized styling system for consistency.

```tsx
import { emailStyles, cn } from './components/email-styles'

<Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.sm}`}>
  Your content
</Text>
```

## 📧 Email Templates

### Order Confirmation
```tsx
import OrderConfirmation from './order-confirmation'

<OrderConfirmation
  customerName="John Doe"
  orderNumber="#SC-2024-001"
  orderTotal="€299.99"
  orderDate="2024-01-15"
  items={[
    { name: 'Product Name', quantity: 1, price: '€299.99' }
  ]}
  shippingAddress={{
    street: '123 Main Street',
    city: 'Frankfurt',
    postalCode: '60594',
    country: 'Germany'
  }}
/>
```

### Shipping Notification
```tsx
import ShippingNotification from './shipping-notification'

<ShippingNotification
  customerName="John Doe"
  orderNumber="#SC-2024-001"
  trackingNumber="DHL123456789"
  carrier="DHL"
  estimatedDelivery="2024-01-18"
  trackingUrl="https://www.dhl.com/tracking"
/>
```

### Welcome Email
```tsx
import WelcomeEmail from './welcome-email'

<WelcomeEmail
  customerName="John Doe"
  customerEmail="john@example.com"
  discountCode="WELCOME10"
/>
```

## 🔧 Usage Instructions

1. **Copy the entire `sencommerce` folder** to your SenCommerce project
2. **Install dependencies** (if not already installed):
   ```bash
   npm install @react-email/components
   ```
3. **Update URLs** in components to match your domain structure
4. **Customize branding** by updating the logo URL and colors in `email-styles.tsx`
5. **Add new templates** following the same pattern as existing ones

## 🎯 Customization

### Logo and Branding
Update the default logo URL in `base-layout.tsx`:
```tsx
logoUrl = "https://shop.sen.studio/logo.svg"
```

### Colors and Styling
Modify colors in `email-styles.tsx`:
```tsx
colors: {
  primary: 'your-primary-color',
  // ... other colors
}
```

### Signature Information
Update company details in `signature.tsx` if needed.

## 📱 Contact Information

- **Website**: https://shop.sen.studio
- **Email**: shop@sen.studio
- **Phone**: +49 15566179807

## 🏢 Company Information

**SEN.CO UG (haftungsbeschränkt)**  
Paradiesgasse 53  
60594 Frankfurt am Main  
Germany

Registered: Local Court Frankfurt am Main, HRB 129222  
VAT ID: DE358821685

---

*These templates maintain the same design language and quality as the original SenDev email system, adapted specifically for SenCommerce use.*