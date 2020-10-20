import {RandomValuesProvider} from './random-values-provider';

export interface Options {
    [key: string]: string | Options;
}

export class Autofixture {
    public createMany<T extends object>(template: T, count?: number, options?: Options): T[] {
        count = count || 3;
        const results = [];
        for (let i = 0; i < count; i += 1) {
            results.push(this.create(template, options));
        }

        return results;
    }

    public create<T extends object>(template: T, options?: Options): T {
        let result: T;
        let childOptions: Options;
        let childType: string;
        let childSpec: string;
        const elementCount = 3;
        let childElementTemplate;
        this.throwIfOptionsContainFieldsNotIn(template, options);

        result = Object.assign({}, template);

        this.forEachProperty(result, (name: string) => {
            childType = this.actualTypeOfField(result, name);
            childOptions = options && options[name] as Options;
            childSpec = (options && options[name] as string) || typeof result[name][0];

            switch (childSpec) {
                case('skip'):
                    delete result[name];
                    break;
                case('actualObject'):
                    result[name] = this.create(result[name], childOptions);
                    break;
                case('arrayOfObjects'):
                    childElementTemplate = result[name][0];
                    result[name] = this.createMany(childElementTemplate, elementCount, childOptions);
                    break;
                case('arrayOfPrimitives'):
                    result[name] = this.createManyPrimitiveFromSpec(elementCount, childSpec);
                    break;
                default:
                    result[name] = this.createSimpleProperty(name, childType, options);
            }
        });

        return result;
    }

    private throwIfOptionsContainFieldsNotIn<T>(template: T, options?: object): void {
        if (!options) {
            return;
        }
        this.forEachProperty(options, (name: string) => {
            if (!template.hasOwnProperty(name)) {
                throw Error(`Autofixture specifies field ${name} that is not in the type`);
            }
        });
    }

    // Object.keys is better, don't pass in value
    private forEachProperty(object: object, callback: (name: string) => void): void {
        for (const property in object) {
            if (object.hasOwnProperty(property)) {
                callback(property);
            }
        }
    }

    private actualTypeOfField<T extends object>(t: T, name: string): string {
        // use node_modules/kind-of
        const field = t[name];
        const type = typeof field;

        if (typeof Array.isArray !== 'undefined' && Array.isArray(field)) {
            if (field.length === 0) {
                throw Error(`Found empty array '${name}'`);
            }
            if (Array.isArray(field[0])) {
                throw Error(`Nested array ${name} not supported`);
            }

            return typeof field[0] === 'object' ? 'arrayOfObjects' : 'arrayOfPrimitives';
        }

        return type === 'object' ? 'actualObject' : type;
    }

    private createSimpleProperty(name: string, type: string, options?: Options): string | number | boolean {
        if (this.optionsContain(name, options)) {
            return this.createPrimitiveFromOptions(name, type, options);
        }

        this.throwOnUnsupportedType(type);

        return this.createPrimitiveFromSpec(type);
    }

    private optionsContain(name: string, options?: object): boolean {
        return options && options.hasOwnProperty(name);
    }

    private createPrimitiveFromOptions(name: string, type: string, options: Options): string | number | boolean {
        const spec = options[name] as string;
        this.throwOnIncompatibleSpec(type, spec);

        return this.createPrimitiveFromSpec(spec);
    }

    private throwOnIncompatibleSpec(type: string, spec?: string): void {
        const booleanOk = type === 'boolean' && spec === 'boolean';
        const stringOk = type === 'string' && /string/.test(spec);
        const numberOk = type === 'number' && /number/.test(spec);
        const integerOk = type === 'number' && /integer/.test(spec);

        if (!spec || booleanOk || stringOk || numberOk || integerOk) {
            return;
        }

        throw Error(`AutoFixture spec '${spec}' not compatible with type '${type}'`);
    }

    private throwOnUnsupportedType(type: string): void {
        if (['boolean', 'string', 'number', 'actualObject', 'arrayOfObjects'].includes(type)) {
            return;
        }
        throw Error(`Autofixture cannot generate values of type ' ${type}'`);
    }

    private createManyPrimitiveFromSpec(count: number, spec: string): boolean[] | string[] | number[] {
        const result = [];
        for (let i = 0; i < count; i += 1) {
            result.push(this.createPrimitiveFromSpec(spec));
        }

        return result;
    }

    private createPrimitiveFromSpec(spec: string): boolean | string | number {
        if (spec === 'boolean') {
            return RandomValuesProvider.createBoolean();
        }
        if (/string/.test(spec)) {
            return this.createStringFromSpec(spec);
        }
        if (/number/.test(spec) || /integer/.test(spec)) {
            return this.createNumberFromSpec(spec);
        }
        throw new Error(`Invalid type in autofixture spec '${spec}'`);
    }

    private createStringFromSpec(spec: string): string {
        if (spec === 'string') {
            return RandomValuesProvider.createString();
        }

        // string followed by length inside []
        const parsedString = /^\s*string\s*\[\s*(\d+)\s*\]\s*$/.exec(spec);
        if (parsedString) {
            const length = parseInt(parsedString[1], 10);

            return RandomValuesProvider.createString(length);
        }

        throw new Error(`Invalid string autofixture spec: '${spec}'`);
    }

    private createNumberFromSpec(spec: string): number {
        return this.parseNumberSpec(spec)();
    }

    private parseNumberSpec(spec: string): () => number {

        const parsedSpec = this.parseSimpleNumericalSpec(spec) ||
            this.parseAsOnesidedSpec(spec) ||
            this.parseAsTwosidedSpec(spec);

        if (parsedSpec) {
            return parsedSpec;
        }

        throw Error(`Invalid number autofixture spec: '${spec}'`);
    }

    private parseSimpleNumericalSpec(spec: string): () => number {
        if (spec === 'number') {
            return () => {
                return RandomValuesProvider.createNumber();
            };
        }
        if (spec === 'integer') {
            return () => {
                return RandomValuesProvider.createInteger();
            };
        }

        return undefined;
    }

    private parseAsOnesidedSpec(spec: string): () => number {
        // number or integer, followed by < or >, followed by a real value
        const match = /^\s*(number|integer)\s*(\>|\<)\s*(\d*\.?\d+)\s*$/.exec(spec);
        if (!match) {
            return undefined;
        }

        const isInteger = match[1] === 'integer';
        const isUpperBound = match[2] === '<';
        const limit = parseFloat(match[3]);

        if (isInteger) {
            this.validateIsInteger(match[3]);

            if (isUpperBound) {
                return () => {
                    return RandomValuesProvider.createIntegerBelow(limit);
                };
            }

            return () => {
                return RandomValuesProvider.createIntegerAbove(limit);
            };
        }

        if (isUpperBound) {
            return () => {
                return RandomValuesProvider.createNumberBelow(limit);
            };
        }

        return () => {
            return RandomValuesProvider.createNumberAbove(limit);
        };
    }

    private validateIsInteger(spec: string): void {
        const specContainsPeriod = spec.indexOf('.') >= 0;

        if (specContainsPeriod) {
            throw new Error('Invalid integer autofixture spec contains real value: ' + spec);
        }
    }

    private parseAsTwosidedSpec(spec: string): () => number {
        // a number, followed by <, followed by 'number' or 'integer', followed by < and another number
        const match = /^\s*(\d*\.?\d+)\s*\<\s*(integer|number)\s*\<\s*(\d*\.?\d+)\s*$/.exec(spec);
        if (!match) {
            return undefined;
        }

        const lowerBoundAsString = match[1];
        const upperBoundAsString = match[3];

        const lowerBound = parseFloat(lowerBoundAsString);
        const upperBound = parseFloat(upperBoundAsString);

        if (lowerBound >= upperBound) {
            throw Error(`Lower bound ${lowerBound} must be lower than upper bound ${upperBound}`);
        }

        if (match[2] === 'integer') {
            this.validateIsInteger(lowerBoundAsString);
            this.validateIsInteger(upperBoundAsString);

            return () => {
                return RandomValuesProvider.createIntegerBetween(lowerBound, upperBound);
            };
        }

        return () => {
            return RandomValuesProvider.createNumberBetween(lowerBound, upperBound);
        };
    }
}
