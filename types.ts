
export type AppStatus = 'idle' | 'loading' | 'success' | 'error';

export type AgeGroup = '0-3' | '4-6' | '7-10' | 'Adults';

export type ActivityType = 
  | 'Coloring Page' 
  | 'Mandala' 
  | 'Maze' 
  | 'Word Search' 
  | 'Connect the Dots' 
  | 'Hidden Objects' 
  | 'Color by Number' 
  | 'Tracing Page' 
  | 'Math Worksheet' 
  | 'Cut-out Craft';

export type Holiday = 'None' | 'Christmas' | 'Halloween' | 'Thanksgiving' | 'Fourth of July' | 'Easter' | "Valentine's Day" | "New Year's";

export interface GalleryItem {
  id: string;
  src: string;
  prompt: string;
  type: ActivityType;
  ageGroup: AgeGroup;
  holiday?: Holiday;
  educationalNote?: string;
}

export type InspirationCategory =
  | 'Characters'
  | 'Scenes & Places'
  | 'Styles & Aesthetics'
  | 'Self Care';

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: string;
  popular?: boolean;
  color: string;
}