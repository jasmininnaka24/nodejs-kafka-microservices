export class Product {
    constructor(
        public readonly name: String,
        public readonly price: number,
        public readonly stock: number,
        public readonly description?: String,
        public readonly id?: number,
    ) {}
}