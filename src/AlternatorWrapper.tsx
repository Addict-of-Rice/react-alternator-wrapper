import { Children, cloneElement, isValidElement, type FC, type ReactNode } from 'react';

type Props<T> = {
  targetFC: FC<T>;
  propOverride: Partial<T>[];
  children: ReactNode;
};

export function AlternatorWrapper<T>({ targetFC, propOverride, children }: Props<T>) {
  let count = 0;
  const modifiedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === targetFC) {
      const index = count % propOverride.length;
      count++;
      return cloneElement(child, propOverride[index]);
    }

    return child;
  });

  return <>{modifiedChildren}</>;
}
