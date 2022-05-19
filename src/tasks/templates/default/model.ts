import { Schema, model } from 'mongoose';

import type { {{capitalizedName}}Entity } from './interface';

const {{capitalizedName}}Schema = new Schema<{{capitalizedName}}Entity>({}, { timestamps: true });

export const {{capitalizedName}}Model = model<{{capitalizedName}}Entity>('{{capitalizedName}}', {{capitalizedName}}Schema);
