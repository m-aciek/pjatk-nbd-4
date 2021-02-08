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
        totalBmi: Array.sum(values),
        count: values.length,
      };
    },
    {
      out: { inline: 1 },
      finalize: function (key, value) {
        return {
          minBmi: value.minBmi,
          maxBmi: value.maxBmi,
          avgBmi: value.totalBmi / value.count,
        };
      },
    }
  ).results
);
