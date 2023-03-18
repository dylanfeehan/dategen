
/**
 * The specification for the PostSpecs in this application.
 * Using a class like this makes it much easier to keep track of fields, as opposed to just having raw JS objects all over the place
 */
export default class PostSpecs {

    constructor(title, type, details, preparation, notes, site, location) {
        this.title = title;
        this.type = type;
        this.details = details;
        this.preparation = preparation;
        this.notes = notes;
        this.site = site;
        this.location = location;
        this.id = "";
    }

    static fromObject(post_obj) {
        return new PostSpecs(post_obj.title, 
            post_obj.type, 
            post_obj.details, 
            post_obj.preparation, 
            post_obj.notes, 
            post_obj.site, 
            post_obj.location);
    }

    /**
     * Get a JSON object from the entries in this class instance (to send to API)
     * @returns json object of entries in this class instance
     */
    getJSON() {
        if(!this.enforcePostFields()) {
            console.error("ERROR: a field is null in getJSON");
            return null;
        }
        return Object.fromEntries(Object.entries(this));
    }

    /**
     * Enforce that a class instance has no null fields
     * @returns valid ? true : false
     */
    enforcePostFields() {
        return Object.values(this).every((entry) => entry != null);
    }
}