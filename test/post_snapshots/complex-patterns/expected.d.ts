declare namespace JsonSchemaOrg {
    namespace Complex {
        /**
         * complex patterns
         */
        export interface Patterns {
            p: Patterns.Definitions.Primitives;
            pr: Patterns.Definitions.PrimitivesRequired;
            ut: Patterns.Definitions.UnionTuple | null;
            at: Patterns.Definitions.ArrayTypes | null;
            nt: Patterns.Definitions.NestedTypes | null;
            ct: Patterns.Definitions.CommentTest | null;
            ta: Patterns.Definitions.TypeAlias | null;
            array: Patterns.Definitions.TypeArray | null;
            const: Patterns.Definitions.MathPi | Patterns.Definitions.IsDebug | Patterns.Definitions.IsTest | Patterns.Definitions.ProjectName | null;
        }
        namespace Patterns {
            namespace Definitions {
                export interface ArrayTypes {
                    strings: string[] | null;
                    numbers: number[] | null;
                    arrays: string[][][] | null;
                    array_of_array: (string | string[])[] | null;
                }
                /**
                 * comment test type.
                 * description comment.
                 * example:
                 *   obj = {
                 *     p1: 'example',
                 *     p2: true,
                 *     p3: [ false, 1.23, 'tuple' ],
                 *   }
                 */
                export interface CommentTest {
                    /**
                     * p1 is string type.
                     */
                    p1: string;
                    /**
                     * p2 is union types.
                     * example:
                     * true or 1 or 'string'
                     */
                    p2: boolean | string | number;
                    /**
                     * p3 is tuple types
                     * example:
                     * true
                     * 2.5
                     * p3
                     */
                    p3: [
                        boolean,
                        number,
                        string?,
                        ...any[]
                    ];
                }
                export type IsDebug = false;
                export type IsTest = true;
                export type MathPi = 3.1415926536;
                export interface NestedTypes {
                    first: {
                        second: {
                            third: {};
                        };
                    };
                }
                export interface Primitives {
                    readonly any: any | null;
                    array: any[] | null;
                    boolean: boolean | null;
                    double: number | null; // double
                    int: number | null; // int
                    integer: number | null;
                    null: null;
                    number: number | null;
                    object: {} | null;
                    string: string | null;
                    undefined: undefined | null;
                }
                export interface PrimitivesRequired {
                    readonly any: any;
                    array: any[];
                    boolean: boolean;
                    double: number; // double
                    int: number; // int
                    integer: number;
                    null: null;
                    number: number;
                    object: {};
                    string: string;
                    undefined: undefined;
                }
                export type ProjectName = "dtsgenerator";
                export type TypeAlias = Primitives | PrimitivesRequired;
                export type TypeArray = {
                    a: string;
                    b: string | null;
                    n: {
                        c: number;
                    }[] | null;
                }[];
                export interface UnionTuple {
                    s_tuple: "A" | "B" | "C" | null;
                    n_tuple: 1 | 2 | 3 | 4 | 5 | null;
                    some_types: boolean | number | string | null;
                    ref_types: Primitives | PrimitivesRequired | null;
                    nullable: string | null;
                }
            }
        }
    }
}
