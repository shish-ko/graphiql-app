export function fBaseErrReader(error: string) {
  console.log(error);
  return error.substring(error.indexOf('/') + 1, error.indexOf(')'));
}
