const faIconsCategoriesCodesMap = {
  tutors: 'graduation-cap',
  healthcare: 'stethoscope',
  beauty: 'spa',
  dating: 'venus-mars',
  skilled: 'paint-roller',
  home: 'home',
  photo: 'camera',
  professionals: 'user-tie',
  other: 'briefcase',
} as const;

const defaultCode = 'tools' as const;

export const convertCategoryCodeToFaIconCode = (categoryCode: string): string =>
  faIconsCategoriesCodesMap[categoryCode] ?? defaultCode;
