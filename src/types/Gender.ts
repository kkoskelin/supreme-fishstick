export const GenderList = ['Boys', 'Girls'] as const;
export type Gender = (typeof GenderList)[number];
