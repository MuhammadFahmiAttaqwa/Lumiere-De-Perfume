import type { GENDERS } from '@/shared/constants/catalog';

export type Gender = (typeof GENDERS)[keyof typeof GENDERS];
