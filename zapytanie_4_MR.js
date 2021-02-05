printjson(
  db.people.mapReduce(
    function () {
      emit(
        this.nationality,
        parseFloat(this.weight) / Math.pow(parseFloat(this.height) / 100, 2)
      );
    },
    function (key, values) {
      return {
        minBmi: Math.min(...values),
        maxBmi: Math.max(...values),
      };
    },
    { out: { inline: 1 } }
  ).results
);
