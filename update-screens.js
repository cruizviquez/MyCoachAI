// update-screens.js
const fs = require('fs');
const path = require('path');

// List all your screen files
const screenFiles = [
  'src/screens/onboarding/OnboardingGoals.tsx',
  'src/screens/onboarding/OnboardingProfile.tsx',
  'src/screens/onboarding/OnboardingLimitations.tsx',
  'src/screens/onboarding/OnboardingEquipment.tsx',
  'src/screens/onboarding/OnboardingSchedule.tsx',
  'src/screens/onboarding/SetupScreen.tsx',
  'src/screens/workout/WorkoutPlanScreen.tsx',
  'src/screens/HomeScreen.tsx',
  'src/screens/CameraScreen.tsx',
];

screenFiles.forEach(file => {
  const filePath = path.join(__dirname, 'apps/mobile', file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if not exists
    if (!content.includes('ScreenContainer')) {
      const importStatement = `import { ScreenContainer } from '../../components/ScreenContainer';\nimport { Button } from '../../components/Button';\n`;
      content = importStatement + content;
    }
    
    // Replace SafeAreaView with ScreenContainer
    content = content.replace(
      /<SafeAreaView[\s\S]*?<ScrollView/g,
      '<ScreenContainer scrollable={true}>\n'
    );
    
    // Replace closing tags
    content = content.replace(
      /<\/ScrollView>\s*<\/SafeAreaView>/g,
      '</ScreenContainer>'
    );
    
    // Update colors
    content = content.replace(/#FF6B35/g, '#00D4FF');
    content = content.replace(/#fff5f0/g, '#0A0A0A');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${file}`);
  } else {
    console.log(`❌ File not found: ${file}`);
  }
});

console.log('🎉 All files updated!');