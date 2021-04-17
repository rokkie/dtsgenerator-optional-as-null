import { ts, Plugin, PluginContext } from 'dtsgenerator';

import SyntaxKind = ts.SyntaxKind;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

/**
 * This file is the main implementation for this plugin.
 */
const plugin: Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
  },
  postProcess,
};

/**
 * Check if a type node is a literal `null`
 */
const isLiteralNull = (typeNode: ts.TypeNode) =>
  ts.isLiteralTypeNode(typeNode) && typeNode.literal.kind === SyntaxKind.NullKeyword;

/**
 * This `postProcess` is the hook for the output AST changing.
 */
async function postProcess(pluginContext: PluginContext): Promise<ts.TransformerFactory<ts.SourceFile> | undefined> {
  return (context: ts.TransformationContext) => (root: ts.SourceFile): ts.SourceFile => {
    const visit = (node: ts.Node): ts.Node => {
      // visit all the child nodes recursively
      node = ts.visitEachChild(node, visit, context);

      // check if the node is a property signature with a question token (meaning is it optional)
      if (ts.isPropertySignature(node) && node.questionToken && node.type) {
        const {
          createLiteralTypeNode,
          createUnionTypeNode,
          updateUnionTypeNode,
          createNodeArray,
          updatePropertySignature,
        } = context.factory;

        // create a literal `null` type node
        const nullNode = createLiteralTypeNode(ts.createNull());

        let maybeType: ts.TypeNode;

        // if the type node is already a union type
        if (ts.isUnionTypeNode(node.type)) {
          // if the union already contains a `null` literal
          maybeType = node.type.types.some(isLiteralNull)
            ? // use the original union
              node.type
            : // otherwise add `null` to the union
              updateUnionTypeNode(node.type, createNodeArray([...node.type.types, nullNode]));
        } else {
          // if the type node is already a `null` literal
          maybeType = isLiteralNull(node.type)
            ? // use the original type node
              node.type
            : // otherwise create a union with the original type node and a `null` literal
              createUnionTypeNode([node.type, nullNode]);
        }

        // update the property signature leaving out the question token and set the type to the union containing the `null`
        return updatePropertySignature(node, node.modifiers, node.name, undefined, maybeType);
      }

      // not a property signature so do nothing
      return node;
    };

    const option = pluginContext.option;
    const excluded =
      typeof option !== 'boolean' &&
      Array.isArray(option.exclude) &&
      option.exclude.some((pattern) => new RegExp(pattern).test(root.fileName));

    return excluded ? root : ts.visitNode(root, visit);
  };
}

export default plugin;
