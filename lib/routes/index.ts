import {Request, Response} from "express";
import { ContactController } from "../controllers/crmController";
import { CountryController } from "../controllers/countryController";
import { ZipController } from "../controllers/zipController";




export class Routes {
    
    public contactController: ContactController = new ContactController();
    public countryController: CountryController = new CountryController();
    public zipController: ZipController = new ZipController();

    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        app.route('/countries')
        .get(this.countryController.getCountries); 

        app.route('/countryState')
        .get(this.zipController.getCountryStateGroup);

        app.route('/countryStateCites')
        .get(this.zipController.countryStateCites);
        

        app.route('/zip')
        .get(this.zipController.getZipByParams);


        app.route('/getLocationByZipCode')
        .get(this.zipController.getLocationByZipCode);

        
        // // Contact
        // app.route('/contact') 
        // .get(this.contactController.getContacts)     
        // .post(this.contactController.addNewContact);

        // // Contact detail
        // app.route('/contact/:contactId')
        // // get specific contact
        // .get(this.contactController.getContactWithID)
        // .put(this.contactController.updateContact)
        // .delete(this.contactController.deleteContact);
    }
}