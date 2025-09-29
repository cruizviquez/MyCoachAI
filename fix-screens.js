// fix-screens.js
const fs = require('fs');

// Fix OnboardingGoals.tsx
const filePath = './apps/mobile/src/screens/onboarding/OnboardingGoals.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Count opening and closing tags
const openingTags = (content.match(/<ScreenContainer/g) || []).length;
const closingTags = (content.match(/<\/ScreenContainer>/g) || []).length;

console.log(`Found ${openingTags} opening and ${closingTags} closing ScreenContainer tags`);

// If mismatch, show where
if (openingTags !== closingTags) {
  console.log('❌ Tag mismatch! Fixing...');
  
  // Remove all old SafeAreaView/ScrollView tags
  content = content.replace(/<\/ScrollView>\s*<\/SafeAreaView>/g, '');
  content = content.replace(/<\/SafeAreaView>/g, '');
  content = content.replace(/<\/ScrollView>/g, '');
  
  // Make sure we have proper closing
  if (!content.includes('</ScreenContainer>')) {
    // Add closing tag before the final }
    content = content.replace(/(\s*}\s*;?\s*)$/, '\n    </ScreenContainer>\n$1');
  }
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Fixed!');
}