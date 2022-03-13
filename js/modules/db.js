const getDatabaseData = async () => {
  const result = await fetch('db/db.json');
  const data = await result.json();
  return data;
};

export default getDatabaseData;
