import { SortCriterium } from '@ibfd/endecapod';

export interface Sortings {
    name: string;
    asc: SortCriterium[];
    desc: SortCriterium[];
    default: string;
}
