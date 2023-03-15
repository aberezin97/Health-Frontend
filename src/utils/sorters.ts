export const numberSortFunc = (
  a: any,
  b: any,
  order: 'asc' | 'desc',
  dataField: any,
  rowA: any,
  rowB: any
) => {
  if (order === 'asc') {
    return Number(a) - Number(b);
  }
  return Number(b) - Number(a);
};
