let balances = db.people.mapReduce(
  function () {
    if (this.nationality == "Poland" && this.sex == "Female") {
      this.credit.forEach((e) => emit(e.currency, parseFloat(e.balance)));
    }
  },
  function (key, values) {
    return {
      sum: Array.sum(values),
      count: values.length,
    };
  },
  {
    out: { inline: 1 },
    finalize: function (key, value) {
      return { totalBalance: value.sum, avgBalance: value.sum / value.count };
    },
  }
);
printjson(balances.results);