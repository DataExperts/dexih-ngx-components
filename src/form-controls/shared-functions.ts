export class SharedFunctions {
    // return the property value from any object.
    public fetchFromObject(obj: any, prop: any): any {
        if (!prop) {
            return obj;
        }
        if (typeof obj === 'undefined' || typeof prop === 'undefined') {
            return null;
        }

        let propType = typeof prop;
        if (propType !== 'number') {
            // if the property has a "." recurse to the next nesting.
            let _index = prop.indexOf('.');
            if (_index > -1) {
                return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
            }
        }

        let value = obj[prop];

        return value;
    }
}

export class ListItem {
    public label: string;
    public key: any;
    public title: string;
    public item: any;
}
