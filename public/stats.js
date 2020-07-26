// get all workout data from back-end

fetch("/api/workouts/range")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateChart(data);
  });

API.getWorkoutsInRange();

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];

  return arr;
}
function populateChart(data) {
  let totalDuration = sumDuration(data);
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  let resistanceWorkouts = resistanceNames(data);
  let poundsByCategory = calculateTotalWeightCategory(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Workout 1",
        "Workout 2",
        "Workout 3",
        "Workout 4",
        "Workout 5",
        "Workout 6",
        "Workout 7",
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: totalDuration,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Workout 1",
        "Workout 2",
        "Workout 3",
        "Workout 4",
        "Workout 5",
        "Workout 6",
        "Workout 7",
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed in Last 7 Workouts",
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed in Last 7 Workouts",
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: resistanceWorkouts,
      datasets: [
        {
          label: "Exercises Performed in Last 7 Workouts",
          backgroundColor: colors,
          data: poundsByCategory,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed in Last 7 Workouts",
      },
    },
  });
}

// New function to retrieve the total duration created using a virtual
const sumDuration = (data) => {
  let durations = [];
  data.forEach((workout) => {
    durations.push(workout.totalDuration);
  });
  return durations;
};

const duration = (data) => {
  let durations = [];
  let exerciseName = [];
// Only unique exercises are added to the durations array and multiple instances of an exercise have their durations summed
  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exerciseName.includes(exercise.name)) {
        let index = exerciseName.indexOf(exercise.name);
        let durationTotal = durations[index] + exercise.duration;
        durations[index] = durationTotal;
      } else {
        durations.push(exercise.duration);
        exerciseName.push(exercise.name);
      }
    });
  });
  return durations;
};

// Function amended so that only resistance exercises are shown as cardio exercises have no weight data
function calculateTotalWeight(data) {
  let total = [];
  data.forEach((workout) => {
    let sumWeight = 0;
    workout.exercises.forEach((exercise) => {
      if (exercise.type === "resistance") {
        sumWeight += exercise.weight;
      }
    });
    total.push(sumWeight);
  });
  return total;
}

//Calculates totalweight over the 7 workouts grouped by exercise
function calculateTotalWeightCategory(data) {
  let total = [];
  let names = [];
  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.type === "resistance") {
        if (names.includes(exercise.name)) {
          let index = names.indexOf(exercise.name);
          let sumWeight = total[index] + exercise.weight;
          total[index] = sumWeight;
        } else {
          total.push(exercise.weight);
          names.push(exercise.name);
        }
      }
    });
  });
  console.log(total);
  return total;
}

// New function to retrieve all exercises with type of resistance for use on the weight aggregation chart
function resistanceNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (
        !workouts.includes(exercise.name) &&
        exercise.type === "resistance"
      )
        workouts.push(exercise.name);
    });
  });
  return workouts;
}

// Amended function to ensure no exercises are duplicated (durations totalled in above function)
function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (!workouts.includes(exercise.name)) {
        workouts.push(exercise.name);
      }
    });
  });

  return workouts;
}
