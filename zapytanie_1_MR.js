db.people.mapReduce(
  function () {
    emit(this.sex, {
      weight: parseFloat(this.weight),
      height: parseFloat(this.height),
    });
  },
  function (key, values) {
    var reducedVal = { count: 0, totalWeight: 0, totalHeight: 0 };
    values.forEach((value) => {
      reducedVal.count += 1;
      reducedVal.totalWeight += value.weight;
      reducedVal.totalHeight += value.height;
    });
    return reducedVal;
  },
  {
    finalize: function (key, reducedVal) {
      reducedVal.avgWeight = reducedVal.totalWeight / reducedVal.count;
      reducedVal.avgHeight = reducedVal.totalHeight / reducedVal.count;

      return reducedVal;
    },
    out: "avgs",
  }
);
printjson(db.avgs.find().toArray());
