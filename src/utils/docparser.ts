import { Type } from '~interfaces/doc_interfaces';

export function getOfTypeName(type: Type): string {
  return type.ofType ? getOfTypeName(type.ofType) : type.name!;
}

export function getOfType(type: Type, namesArr: string[] = []): string {
  if (type.ofType) {
    namesArr.push(type.kind!);
    return getOfType(type.ofType, namesArr);
  } else {
    namesArr.push(type.name!);
    const res = namesArr.reduceRight((acc, item) => {
      if (item.match(/non_null/i)) {
        return `${acc}!`;
      } else if (item.match(/list/i)) {
        return `[${acc}]`;
      } else {
        return item;
      }
    }, '');
    return res;
  }
}
