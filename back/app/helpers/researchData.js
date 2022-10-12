module.exports = {
  dataFormat(research) {
    // Separate each element of the req.params.research and add spaces where it belongs
    const dataSplit = research.split('+').map((string) => string.replace('_', ' '));
    // Set value on Null when there is no string
    const dataArray = dataSplit.map((string) => (string.length === 0 ? null : string));
    // Put datas on an object
    const [postalCode, date, level, place, category] = dataArray;
    const data = {
      postalCode, date, level, place, category,
    };
    if (data.postalCode !== null) {
      data.postalCode = `^${data.postalCode}...$`;
    }
    return data;
  },
};
