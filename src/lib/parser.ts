export const parser = (data: any) => {
  return data ? JSON?.parse(JSON.stringify(data)) : null;
};
