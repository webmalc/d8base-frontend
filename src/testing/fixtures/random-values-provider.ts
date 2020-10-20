export class RandomValuesProvider {
    public static createBoolean(): boolean {
        return Math.random() > 0.5;
    }

    public static createString(length?: number): string {
        // TODO use random-seed or randomatic
        length = length || 10;
        let result = '';
        const buffer = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV1234567890';
        for (let i = 0; i < length; i += 1) {
            const offset = Math.floor(Math.random() * buffer.length);
            result += buffer[offset];
        }

        return result;
    }

    public static createNumber(): number {
        return 1000 * Math.random();
    }

    public static createNumberBelow(upperBound: number): number {
        return upperBound - 1000 * Math.random();
    }

    public static createNumberAbove(lowerBound: number): number {
        return lowerBound + 1000 * Math.random();
    }

    public static createNumberBetween(lowerBound: number, upperBound: number): number {
        return lowerBound + (upperBound - lowerBound) * Math.random();
    }

    public static createInteger(): number {
        return Math.floor(RandomValuesProvider.createNumber());
    }

    public static createIntegerBelow(upperBound: number): number {
        return Math.floor(RandomValuesProvider.createNumberBelow(upperBound));
    }

    public static createIntegerAbove(lowerBound: number): number {
        return Math.floor(RandomValuesProvider.createNumberAbove(lowerBound));
    }

    public static createIntegerBetween(lowerBound: number, upperBound: number): number {
        return Math.floor(RandomValuesProvider.createNumberBetween(lowerBound, upperBound));
    }
}
