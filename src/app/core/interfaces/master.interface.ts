export interface MasterInterface {
    id: number;
    name: string;
    description: string;
    company: string;
    experience: number;
    level: 'junior' | 'middle' | 'senior';
    rating: string;
    subcategory: number;
}
