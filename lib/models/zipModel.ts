import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ZipSchema = new Schema({
    country: {
        type: String            
    },
    code: {
        type: String            
    },
    state: {
        type: String            
    },
    city: {
        type: String         
    }, 
    zipcode: {
        type: String            
    },
    district: {
        type: String            
    }, 
    area: {
        type: String            
    }
});