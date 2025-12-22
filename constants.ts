
import type { InspirationCategory, AgeGroup, ActivityType, Holiday } from './types';

export const AGE_GROUPS: AgeGroup[] = ['0-3', '4-6', '7-10', 'Adults'];

export const ACTIVITY_TYPES: ActivityType[] = [
  'Coloring Page', 
  'Mandala', 
  'Maze', 
  'Word Search',
  'Connect the Dots',
  'Hidden Objects',
  'Color by Number',
  'Tracing Page',
  'Math Worksheet',
  'Cut-out Craft'
];

export const HOLIDAYS: Holiday[] = ['None', 'Christmas', 'Halloween', 'Thanksgiving', 'Fourth of July', 'Easter', "Valentine's Day", "New Year's"];

export const PROMPT_INSPIRATIONS: Record<
  InspirationCategory,
  { label: string; prompt: string }[]
> = {
  'Self Care': [
    {
      label: 'Cozy Reading',
      prompt: 'a cozy reading nook with blankets, tea, and books',
    },
    {
      label: 'Spa Day',
      prompt: 'calming spa essentials, lotus flowers, and smooth stones',
    },
    {
      label: 'Floral Zen',
      prompt: 'intricate floral patterns entwined with vines',
    },
    {
      label: 'Dreamscape',
      prompt: 'a surreal and peaceful floating island in the clouds',
    },
  ],
  Characters: [
    {
      label: 'Brave Knight',
      prompt: 'a brave knight in shining armor',
    },
    {
      label: 'Mystical Sorceress',
      prompt:
        'a mystical sorceress casting a spell',
    },
    {
      label: 'Friendly Robot',
      prompt: 'a friendly, round robot waving hello',
    },
    {
      label: 'Dancing Ballerina',
      prompt: 'a graceful ballerina mid-pirouette',
    },
  ],
  'Scenes & Places': [
    {
      label: 'Enchanted Forest',
      prompt:
        'an enchanted forest with glowing mushrooms',
    },
    {
      label: 'Underwater City',
      prompt:
        'a bustling underwater city with coral skyscrapers',
    },
    {
      label: 'Futuristic Spaceport',
      prompt:
        'a futuristic spaceport with sleek spaceships',
    },
    {
      label: 'Cozy Bookstore',
      prompt:
        'a cozy bookstore filled with towering shelves',
    },
  ],
  'Styles & Aesthetics': [
    {
      label: 'Stained Glass',
      prompt: 'in a beautiful stained glass style',
    },
    {
      label: 'Art Deco',
      prompt:
        'in an elegant Art Deco style with geometric patterns',
    },
    {
      label: 'Whimsical Cartoon',
      prompt: 'drawn in a whimsical and playful cartoon style',
    },
    {
      label: 'Nature Motifs',
      prompt: 'decorated with leaves, vines and flowers',
    },
  ],
};
