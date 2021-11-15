import { ClassNameOverrides } from "..";

export * from "./defaultRenderers";
export * from "./ClassRenderer";
export * from "./DefaultRenderer";
export * from "./LinkRenderer";
export * from "./ImageRenderer";
export * from "./AudioRenderer";
export * from "./VideoRenderer";

export function calculateClassName(
  key: keyof JSX.IntrinsicElements,
  classNameOverrides?: ClassNameOverrides,
  additionalClassName?: string,
  className?: string
): string | undefined {
  const overridden = classNameOverrides?.[key];
  if (overridden) {
    return overridden;
  }

  if (additionalClassName && className) {
    return `${additionalClassName} ${className}`;
  }
  if (additionalClassName) {
    return additionalClassName;
  }
  return className;
}
