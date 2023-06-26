export const AgeList = ['8 & U', '9-10', '11-12', '13-14', '15-18'] as const;
export type Age = (typeof AgeList)[number];
