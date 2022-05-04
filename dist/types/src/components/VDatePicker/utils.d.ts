export declare type DateLocales = {
    months: string[];
    monthsAbbr: string[];
    week: string[];
};
export declare type DateTranslations = {
    ru: DateLocales;
    en: DateLocales;
};
export declare function getMonth(date: Date): number;
export declare function getFullYear(date: Date): number;
export declare function getDate(date: Date): number;
export declare function getDay(date: Date): number;
export declare function getHours(date: Date): number;
export declare function getMinutes(date: Date): number;
export declare function setFullYear(date: any, value: any): any;
export declare function setMonth(date: any, value: any): any;
export declare function setDate(date: any, value: any): any;
export declare function isValidDate(date: any): boolean;
export declare function formatDate(date: Date, format: string, translation: DateLocales): string;
export declare function validateDateInput(val: any): boolean;
