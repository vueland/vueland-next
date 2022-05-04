import { UserOptions } from '../types';
export declare class Vueland {
    static installed: boolean;
    static options: UserOptions;
    constructor(options?: UserOptions);
    static install(app: any): void;
}
