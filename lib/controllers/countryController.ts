import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

import { CountrySchema } from '../models/countryModel';


const Country = mongoose.model('Country', CountrySchema);

export class CountryController {

    public getCountries (req: Request, res: Response) {
        Country.find({}).then(countryList => {
            console.log(countryList);
            res.json(countryList);
        }).catch(err => {
            res.send(err);
        })
    }
}