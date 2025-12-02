#!/bin/bash

# Setup script for using neobrutalism-ui locally
# This script helps you quickly link the package for local development

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🎨 Neobrutalism UI - Local Setup"
echo "================================"
echo ""

# Build the package
echo "📦 Building package..."
cd "$SCRIPT_DIR"
pnpm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build successful!"
echo ""

# Link globally
echo "🔗 Linking package globally..."
pnpm link --global

if [ $? -ne 0 ]; then
  echo "❌ Linking failed!"
  exit 1
fi

echo "✅ Package linked globally!"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Go to your Next.js project:"
echo "   cd /path/to/your/nextjs-app"
echo ""
echo "2. Link the package:"
echo "   pnpm link --global @frappe-ui/neobrutalism"
echo ""
echo "3. Configure Tailwind (add to tailwind.config.js):"
echo "   import neobrutalism from '@frappe-ui/neobrutalism/tailwind'"
echo "   export default {"
echo "     presets: [neobrutalism],"
echo "     content: ["
echo "       './app/**/*.{js,ts,jsx,tsx,mdx}',"
echo "       './node_modules/@frappe-ui/neobrutalism/dist/**/*.{js,mjs}'"
echo "     ]"
echo "   }"
echo ""
echo "4. Import styles (in app/layout.tsx):"
echo "   import '@frappe-ui/neobrutalism/dist/index.css'"
echo ""
echo "5. Start using components:"
echo "   import { Button, Card } from '@frappe-ui/neobrutalism'"
echo ""
echo "📖 For more info, see PUBLISHING.md"
