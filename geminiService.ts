import { GoogleGenAI } from '@google/genai';
import type { AgeGroup, ActivityType, Holiday } from './types';

interface GeminiGenerateParams {
  prompt: string;
  ageGroup: AgeGroup;
  activityType: ActivityType;
  holiday: Holiday;
}

interface AppGenerateResult {
  imageUrl: string;
  educationalNote: string;
}

export const generateContent = async ({
  prompt,
  ageGroup,
  activityType,
  holiday,
}: GeminiGenerateParams): Promise<AppGenerateResult> => {
  // Always create a new instance to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  
  let theme = prompt;
  if (holiday !== 'None') theme = `${holiday} themed ${theme}`.trim();
  if (!theme) theme = holiday !== 'None' ? `${holiday} celebration` : 'whimsical scene';

  const styleContext: Record<AgeGroup, string> = {
    '0-3': 'TODDLER STYLE. Massive 15px black outlines. Maximum 1-2 items. Huge white space. High contrast.',
    '4-6': 'KINDERGARTEN STYLE. Clear 8px black lines. Friendly, simple characters and education-focused layouts.',
    '7-10': 'ELEMENTARY STYLE. Detailed 4px crisp black lines. Patterns, storytelling, and richer environments.',
    'Adults': 'MINDFULNESS STYLE. Intricate botanical or geometric patterns. Fine 1px-2px professional lines.'
  };

  const getActivityDescription = (type: ActivityType, age: AgeGroup): string => {
    switch (type) {
      case 'Coloring Page': 
        return 'A single, large, bold centered illustration with wide open white spaces.';
      case 'Mandala': 
        return 'A centered circular pattern using very large, simple shapes like hearts and stars.';
      case 'Maze': 
        return age === '0-3' 
          ? 'A huge, thick-walled "S" shaped path from a large Start icon to a large End icon. No dead ends.' 
          : 'A simple grid maze with a clear single path and a few simple obstacles.';
      case 'Word Search':
        if (age === '0-3' || age === '4-6') {
            return 'A small 5x5 grid of large, bold capital letters. Underneath, show 3 simple icons with the word next to them for a picture-search key.';
        }
        return 'A standard 10x10 letter grid with a list of 6-8 thematic words to find below.';
      case 'Connect the Dots':
        if (age === '0-3') {
            return 'A simple shape (like a heart or fish) made of exactly 5 LARGE dots numbered 1, 2, 3, 4, 5 in a clear loop.';
        }
        if (age === '4-6') {
          return 'Sequential Silhouette Style: A clear simple outline of a thematic item (like a cupcake, hedgehog, or hot air balloon). Exactly 20-25 numbered dots must form the MAIN BORDER of the image. MANDATORY: The dots MUST be numbered in strict consecutive order (1, 2, 3... 25). No numbers can be skipped. No numbers can be repeated. Include a bold header text at the top: "CONNECT THE DOTS! START AT 1".';
        }
        return 'A thematic silhouette with 15-30 numbered dots forming a clear outline in numerical order.';
      case 'Hidden Objects':
        if (age === '0-3') {
          return 'A simple picture where 2 huge items (like a ball or sun) are clearly visible for a toddler to "find".';
        }
        if (age === '4-6') {
          return 'Checklist Search Style: At the top, a row of 5 small square boxes, each containing a simple icon (e.g., a key, a star, a robot). Below these boxes, a detailed scene where EACH of those 5 specific icons is hidden exactly once. MANDATORY: The icons in the top boxes MUST be the exact items hidden in the scene below.';
        }
        return 'A complex detailed scene where 8 specific items are integrated into the line art patterns. Include a small key at the bottom with icons of the 8 items to find.';
      case 'Color by Number':
        if (age === '0-3') {
          return 'Three massive shapes (Circle, Square, Triangle) labeled with a giant "1", "2", and "3". A small key at top: 1=RED, 2=BLUE, 3=YELLOW.';
        }
        if (age === '4-6') {
          return 'A detailed illustration divided into numbered sections. MANDATORY: Top-left boxed "COLOR KEY" using the exact format: 1 = RED, 2 = BLUE, 3 = GREEN, 4 = YELLOW, 5 = ORANGE. Every numbered area in the drawing must correspond to one of these 5 numbers. Ensure the text in the key is perfectly aligned and spelled correctly.';
        }
        return 'An illustration divided into sections with number labels matching a color-key table with 8-10 colors.';
      case 'Tracing Page': 
        if (age === '0-3' || age === '4-6') {
            return 'Large basic shapes (Heart, Circle, Star) and numbers (1, 2, 3) drawn with THICK DASHED BLACK LINES for easy tracing.';
        }
        return 'A complex thematic illustration drawn entirely with medium-thickness DASHED BLACK LINES.';
      case 'Math Worksheet':
        if (age === '0-3') {
          return 'Counting activity: Two giant identical cupcakes with the number "2" in a large dashed font next to them.';
        }
        if (age === '4-6') {
          return 'Horizontal Visual Math sentences. For each row: [Set of Icons] [+] [Set of Icons] [=] [Empty Box]. Below the first set of icons, write the digit "2". Below the second set, write the digit "3". The quantity of icons MUST match the digit. Example: If the number is 3, draw exactly 3 stars.';
        }
        return 'Simple addition or subtraction problems in clear columns using small thematic icons as visual counting aids.';
      case 'Cut-out Craft': 
        if (age === '0-3') {
          return 'One single giant simple shape (like a flower or star) with a very thick DASHED BORDER for cutting.';
        }
        if (age === '4-6') {
          return 'A "Build-a-Character" kit: 5 separate pieces (head, body, 2 limbs, and 1 accessory like a hat) spread across the page. Each piece MUST have a DASHED CUTTING BORDER. Include a tiny "guide" image of the assembled character in the corner.';
        }
        return 'A set of 8-10 detailed parts for a 3D paper craft, each piece with dashed borders and folding tabs.';
      default: 
        return 'A beautiful illustration.';
    }
  };

  const currentActivityLogic = getActivityDescription(activityType, ageGroup);

  const masterPrompt = `
    TASK: Create a professional ${activityType} worksheet for ${ageGroup} year olds.
    THEME: ${theme}.
    LAYOUT: ${currentActivityLogic}
    STYLE RULES: 
    - ${styleContext[ageGroup]}
    - PURE WHITE BACKGROUND.
    - STARK SOLID BLACK LINES ONLY. 
    - NO GRAY, NO SHADING, NO COLOR, NO GRADIENTS.
    - FOR CONNECT THE DOTS: Numbers MUST be 100% unique and consecutive (1, 2, 3...). No duplicates. No skips.
    - FOR HIDDEN OBJECTS: Total consistency required. Every icon shown in the "Find These" boxes MUST exist exactly once in the scene. No missing items. No extra items.
    - FOR COLOR BY NUMBER: The "COLOR KEY" and the "IMAGE NUMBERS" must be 100% consistent. Use standard colors (Red, Blue, Green, Yellow, Orange, Purple). No spelling errors in the key.
    - FOR MATH ACCURACY: You must count the icons perfectly. If the problem says 3 + 1, you MUST draw exactly 3 objects on the left and 1 object on the right. 1:1 CORRESPONDENCE IS CRITICAL.
    - FOR CUT-OUTS/TRACING: Use distinct DASHED lines for cutting edges.
    - ALL TEXT MUST BE BOLD AND LEGIBLE.
    - MANDATORY: Fill the page area with the required content. Do not leave the page blank.
  `.trim();

  try {
    const imagePromise = (async () => {
      // USING GEMINI 2.5 FLASH IMAGE (FREE TIER ELIGIBLE)
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: masterPrompt }] },
        config: { imageConfig: { aspectRatio: "3:4" } },
      });

      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
      throw new Error('This combination is a bit too magical for the studio. Try a simpler theme!');
    })();

    const textPromise = (async () => {
      // USING GEMINI 3 FLASH PREVIEW (FREE TIER ELIGIBLE)
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Audience: Age ${ageGroup}. Theme: ${theme}. Activity: ${activityType}.
                   Write a warm one-sentence tip for a parent or child (max 10 words).
                   IMPORTANT: No lists. No markdown. No word bank. Just a simple encouraging tip like "Start with number 1 and draw a line to number 2!"`,
        config: { systemInstruction: 'You are a warm studio assistant. ONE SHORT SENTENCE ONLY. NO formatting. NO markdown.' }
      });
      return (response.text || "Time to grab the crayons!").replace(/[*#]/g, '').trim();
    })();

    const [imageUrl, educationalNote] = await Promise.all([imagePromise, textPromise]);
    return { imageUrl, educationalNote };

  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw new Error(error.message || 'The studio is busy at the moment. Please try again!');
  }
};
