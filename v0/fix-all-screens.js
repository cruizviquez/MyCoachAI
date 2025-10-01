// fix-all-screens.js
const fs = require('fs');
const path = require('path');

function fixScreen(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Step 1: Add imports if missing
    if (!content.includes('ScreenContainer')) {
      const importLine = "import { ScreenContainer } from '../../components/ScreenContainer';\n";
      
      // Add after other imports
      if (content.includes('import React')) {
        content = content.replace(
          /(import React.*?\n)/,
          `$1${importLine}`
        );
      } else {
        content = importLine + content;
      }
    }
    
    // Step 2: Find the return statement and fix the JSX
    // This regex finds the return statement and its content
    const returnMatch = content.match(/return\s*\(([\s\S]*?)\n\s*\);/);
    
    if (returnMatch) {
      let jsxContent = returnMatch[1];
      
      // Remove old wrapper tags
      jsxContent = jsxContent.replace(/<SafeAreaView[^>]*>/g, '<ScreenContainer scrollable={true}>');
      jsxContent = jsxContent.replace(/<\/SafeAreaView>/g, '</ScreenContainer>');
      jsxContent = jsxContent.replace(/<ScrollView[^>]*>/g, '');
      jsxContent = jsxContent.replace(/<\/ScrollView>/g, '');
      
      // Remove any extra View wrappers that might cause issues
      jsxContent = jsxContent.replace(/<View style={styles\.container}>/g, '<>');
      jsxContent = jsxContent.replace(/^\s*<View>\s*$/gm, '<>');
      
      // Count tags to ensure they match
      const openCount = (jsxContent.match(/<ScreenContainer/g) || []).length;
      const closeCount = (jsxContent.match(/<\/ScreenContainer>/g) || []).length;
      
      // Fix mismatched tags
      if (openCount > closeCount) {
        // Add missing closing tags
        for (let i = 0; i < openCount - closeCount; i++) {
          jsxContent = jsxContent.trimEnd() + '\n    </ScreenContainer>';
        }
      } else if (closeCount > openCount) {
        // Remove extra closing tags
        jsxContent = jsxContent.replace(/<\/ScreenContainer>/g, '');
        jsxContent = jsxContent.trimEnd() + '\n    </ScreenContainer>';
      }
      
      // Reconstruct the return statement
      content = content.replace(
        /return\s*\(([\s\S]*?)\n\s*\);/,
        `return (\n    ${jsxContent.trim()}\n  );`
      );
    }
    
    // Step 3: Update colors
    content = content.replace(/#FF6B35/g, '#00D4FF');
    content = content.replace(/#fff5f0/g, '#0A0A0A');
    
    // Step 4: Fix navigation container styles
    content = content.replace(/position:\s*['"](fixed|absolute)['"]/g, 'position: "relative"');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// List of all screens to fix
const screens = [
  'apps/mobile/src/screens/onboarding/OnboardingGoals.tsx',
  'apps/mobile/src/screens/onboarding/OnboardingProfile.tsx',
  'apps/mobile/src/screens/onboarding/OnboardingLimitations.tsx',
  'apps/mobile/src/screens/onboarding/OnboardingEquipment.tsx',
  'apps/mobile/src/screens/onboarding/OnboardingSchedule.tsx',
  'apps/mobile/src/screens/onboarding/SetupScreen.tsx',
  'apps/mobile/src/screens/onboarding/WelcomeScreen.tsx',
  'apps/mobile/src/screens/workout/WorkoutPlanScreen.tsx',
  'apps/mobile/src/screens/HomeScreen.tsx',
  'apps/mobile/src/screens/CameraScreen.tsx',
];

console.log('🔧 Fixing all screens...\n');

screens.forEach(screen => {
  const fullPath = path.join('/workspaces/RoboQoach', screen);
  if (fs.existsSync(fullPath)) {
    fixScreen(fullPath);
  } else {
    console.log(`⚠️ File not found: ${screen}`);
  }
});

console.log('\n✅ All screens processed!');