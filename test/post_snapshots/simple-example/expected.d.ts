declare namespace JsonSchemaOrg {
    /**
     * A geographical coordinate
     */
    export interface Geo {
        latitude: number | null;
        longitude: number | null;
    }
    /**
     * Product set
     */
    export type SimpleExample = {
        /**
         * The unique identifier for a product
         */
        id: number;
        name: string;
        price: number;
        tags: string[] | null;
        dimensions: {
            length: number;
            width: number;
            height: number;
        } | null;
        /**
         * Coordinates of the warehouse with the product
         */
        warehouseLocation: Geo | null;
    }[];
}
