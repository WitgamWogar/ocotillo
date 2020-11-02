import { Document } from 'mongoose';

export interface Plant extends Document {
    readonly scientific_name: string;
    readonly common_name: string;
    readonly nickname: string;
    readonly aquired_at: string;
    readonly source: string[];
    readonly acquired_at: Date;
}