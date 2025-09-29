// fix-jsx-errors.js
const fs = require('fs');
const path = require('path');

function cleanAndFixScreen(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    console.log(`\nFixing ${fileName}...`);
    
    // Step 1: Remove ALL old wrapper tags completely
    content = content.replace(/<SafeAreaView[^>]*>/g, '');
    content = content.replace(/<\/SafeAreaView>/g, '');
    content = content.replace(/<ScrollView[^>]*>/g, '');
    content = content.replace(/<\/ScrollView>/g, '');
    
    // Step 2: Add import if missing
    if (!content.includes('ScreenContainer')) {
      const importStatement = "import { ScreenContainer } from '../../components/ScreenContainer';\n";
      
      if (content.includes('from \'react\'')) {
        content = content.replace(
          /(from ['"]react['"];?\n)/,
          `$1${importStatement}`
        );
      } else {
        content = importStatement + content;
      }
    }
    
    // Step 3: Find the component function and fix its return
    const componentMatch = content.match(/export\s+(?:const|function)\s+\w+[^{]*{([\s\S]*?)^}/m);
    
    if (componentMatch) {
      let componentBody = componentMatch[1];
      
      // Find the return statement
      const returnMatch = componentBody.match(/return\s*\(([\s\S]*)\);?$/);
      
      if (returnMatch) {
        let jsxContent = returnMatch[1].trim();
        
        // Clean up the JSX
        // Remove any existing ScreenContainer tags to start fresh
        jsxContent = jsxContent.replace(/<ScreenContainer[^>]*>/g, '');
        jsxContent = jsxContent.replace(/<\/ScreenContainer>/g, '');
        
        // Remove fragments that might be causing issues
        jsxContent = jsxContent.replace(/<>\s*/g, '');
        jsxContent = jsxContent.replace(/\s*<\/>/g, '');
        
        // Wrap with ScreenContainer
        jsxContent = `<ScreenContainer scrollable={true}>
      ${jsxContent}
    </ScreenContainer>`;
        
        // Reconstruct the component
        componentBody = componentBody.replace(
          /return\s*\(([\s\S]*)\);?$/,
          `return (
    ${jsxContent}
  );`
        );
        
        // Replace in original content
        content = content.replace(
          /export\s+(?:const|function)\s+\w+[^{]*{[\s\S]*?^}/m,
          `export const ${fileName.replace('.tsx', '')} = ({ navigation, route }) => {${componentBody}}`
        );
      }
    }
    
    // Step 4: Update colors
    content = content.replace(/#FF6B35/gi, '#00D4FF');
    content = content.replace(/#fff5f0/gi, '#0A0A0A');
    
    // Step 5: Fix style issues
    content = content.replace(/position:\s*['"]?(fixed|absolute)['"]?/gi, 'position: "relative"');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${fileName}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error in ${filePath}: ${error.message}`);
    return false;
  }
}

// Fix all screens
const baseDir = '/workspaces/RoboQoach/apps/mobile/src';

const filesToFix = [
  'screens/onboarding/OnboardingGoals.tsx',
  'screens/onboarding/OnboardingProfile.tsx',
  'screens/onboarding/OnboardingEquipment.tsx',
  'screens/onboarding/OnboardingLimitations.tsx',
  'screens/onboarding/OnboardingSchedule.tsx',
  'screens/onboarding/SetupScreen.tsx',
  'screens/workout/WorkoutPlanScreen.tsx',
  'screens/HomeScreen.tsx',
  'screens/CameraScreen.tsx',
  'screens/VisionCoachScreen.tsx',
];

console.log('🔧 Starting comprehensive fix...\n');

filesToFix.forEach(file => {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    cleanAndFixScreen(fullPath);
  }
});

console.log('\n✅ Fix complete! Now checking for remaining errors...');