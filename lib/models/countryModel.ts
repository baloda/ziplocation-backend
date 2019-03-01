import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CountrySchema = new Schema({
    name: {
        type: String            
    },
    code: {
        type: String            
    }
});