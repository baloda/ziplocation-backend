import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

import { ZipSchema } from '../models/zipModel';
import { stat } from 'fs';


const Zip = mongoose.model('Zip', ZipSchema);

export class ZipController {

    public getZipByParams (req: Request, res: Response) {
        let where: Object = req.query.where || {};
        let country: string = req.query.country || '';
        let state: string = req.query.state || '';
        let city: string = req.query.city || '';
        console.log('asdfasdfasdf');
        if (!country || !state) {
            console.log(country, state, 'hello');
            let err = new Error('Invalid parameters')
            res.send(err);
            return;
        }
        console.log(country, state, city);
        Zip.find({
            country: { $regex: country, $options: 'i'},
            state: { $regex: state, $options: 'i'},
            ...((city && {city: { $regex: city, $options: 'i'}}) || {})
        }).limit((!city && 1500) || 15).exec().then(zipList => {
            console.log(zipList);
            res.json(zipList);
        }).catch(err => {
            res.send(err);
        })
    }

    public getCountryStateGroup (req: Request, res: Response) {

        Zip.aggregate([
            {
                $group: {
                    _id: {
                        country: "$country",
                        state: "$state"
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    country: "$_id.country",
                    state: '$_id.state'
                }
            }
        ]).limit(1000).exec().then(zipList => {
            console.log(zipList);
            res.json(zipList);
        }).catch(err => {
            res.send(err);
        })
    }

    public countryStateCites(req: Request, res: Response) {
        let country: string = req.query.country || '';
        let state: string = req.query.state || '';
        Zip.aggregate([
            {
                $match: {
                    country: { $regex: country, $options: 'i'},
                    state: { $regex: state, $options: 'i'}
                }
            },
            {
                $group: {
                    _id: {
                        country: "$country",
                        state: "$state",
                        city: "$city"
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    country: "$_id.country",
                    state: "$_id.state",
                    city: "$_id.city"
                }
            }, {
                $project: {
                    city: 1
                }
            }
        ]).limit(150).exec().then(cites => {
            cites = cites.map(item=>item.city);
            res.json(cites);
        }).catch(err => {
            res.send(err);
        })
    }
    public getLocationByZipCode(req: Request, res: Response) {
        let zipcode: string = req.query.zipcode || 400072;
        Zip.aggregate([
            {
                $match: {
                    zipcode: +zipcode,
                }
            }
        ]).limit(150).exec().then(zips => {
            res.json(zips);
        }).catch(err => {
            res.send(err);
        })
    }

    // Zip.find({
            
        // }).select('-_id city').exec()
}