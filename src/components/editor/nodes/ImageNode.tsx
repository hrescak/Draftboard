import * as React from "react";
import {
  type DOMConversionMap,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
  DecoratorNode,
} from "lexical";
import { Suspense } from "react";

export type SerializedImageNode = Spread<
  {
    src: string;
    altText: string;
    width?: number;
    height?: number;
    caption?: string;
  },
  SerializedLexicalNode
>;

function ImageComponent({
  src,
  altText,
  width,
  height,
}: {
  src: string;
  altText: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="my-4">
      <img
        src={src}
        alt={altText}
        width={width}
        height={height}
        className="max-w-full rounded-lg"
        loading="lazy"
      />
    </div>
  );
}

export class ImageNode extends DecoratorNode<React.ReactElement> {
  __src: string;
  __altText: string;
  __width?: number;
  __height?: number;
  __caption?: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__caption,
      node.__key
    );
  }

  constructor(
    src: string,
    altText: string,
    width?: number,
    height?: number,
    caption?: string,
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
    this.__caption = caption;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const div = document.createElement("div");
    div.className = "editor-image";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    if (this.__width) {
      element.setAttribute("width", this.__width.toString());
    }
    if (this.__height) {
      element.setAttribute("height", this.__height.toString());
    }
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: (domNode: HTMLElement) => {
          const img = domNode as HTMLImageElement;
          const node = $createImageNode({
            src: img.src,
            altText: img.alt,
            width: img.width || undefined,
            height: img.height || undefined,
          });
          return { node };
        },
        priority: 0,
      }),
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return $createImageNode({
      src: serializedNode.src,
      altText: serializedNode.altText,
      width: serializedNode.width,
      height: serializedNode.height,
      caption: serializedNode.caption,
    });
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      caption: this.__caption,
    };
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  decorate(): React.ReactElement {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
        />
      </Suspense>
    );
  }

  isInline(): boolean {
    return false;
  }

  isKeyboardSelectable(): boolean {
    return true;
  }
}

export function $createImageNode({
  src,
  altText,
  width,
  height,
  caption,
}: {
  src: string;
  altText: string;
  width?: number;
  height?: number;
  caption?: string;
}): ImageNode {
  return new ImageNode(src, altText, width, height, caption);
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode;
}
