export function classesFromArray(classes: string[]): undefined | string {
   if (classes.length === 0) return undefined;
   return classes.join(" ");
}

export function getClassName({
   initialClassName,
   className,
}: {
   initialClassName?: string;
   className?: string;
}): string | undefined {
   const classes = [];
   if (initialClassName) classes.push(initialClassName);
   if (className) classes.push(className);
   if (classes.length === 0) return undefined;
   return classes.join(" ");
}

export async function delay(ms: number): Promise<void> {
   return await new Promise<void>((resolve, reject) => {
      setTimeout(() => resolve(), ms);
   });
}
