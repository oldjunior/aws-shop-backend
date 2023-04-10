const mapReducer = (map, item) => (map[item.id] = item) && map;

export const joinTables = (table1, table2) => {
  if (!Array.isArray(table1) || !Array.isArray(table2)) return;

  const productsItemIdMap = table1.reduce(mapReducer, {});
  const stocksItemIdMap = table2.reduce(mapReducer, {});

  return table1.map(item => ({...productsItemIdMap[item.id], ...stocksItemIdMap[item.id]}));
}
