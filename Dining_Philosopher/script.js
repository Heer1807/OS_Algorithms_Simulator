function startSimulation() {
    var n = parseInt(document.getElementById("pnum").value);
    const outputDiv = document.getElementById("output1");
    var t1 = parseInt(document.getElementById("time1").value);
    var t2 = parseInt(document.getElementById("time2").value);

    if (n < 2) {
        alert("Minimum number of philosophers is 2");
        return false;
    } else if (t1 <= 0) {
        alert("Time gap can't be 0 or negative");
        return false;
    } else if (t2 <= 0) {
        alert("Eating time should be greater than 0");
        return false;
    } else if (isNaN(n) || isNaN(t1) || isNaN(t2)) {
        alert("Please fill all the details");
        return false;
    }

    const philo = [];
    const forks = [];

    for (let i = 0; i < n; i++) {
        philo.push(i);
        forks.push(i);
    }

    console.log("The initial forks array is: " + forks);
    console.log("The initial philosophers' array is: " + philo);

    outputDiv.innerHTML = "";

    for (let i = 0; i < forks.length; i++) {
        // Use a block scoped variable inside setTimeout callback
        ((index) => {
            setTimeout(function () {
                const numberElem = document.createElement("p");
                if (index < (forks.length - 1)) {
                    numberElem.textContent = "Philosopher(" + philo[index] + ") picked up fork(" + forks[index] + ").";
                } else if (index === (forks.length - 1)) {
                    numberElem.textContent = "Philosopher(" + philo[index] + ") could not pick up fork(" + forks[index - 1] + ") as it has already been picked up by Philosopher(" + philo[index - 1] + "). This means that fork(" + forks[index] + ") is now available for Philosopher(" + philo[index - 1] + "), which will initiate the solution.";
                }
                outputDiv.appendChild(numberElem);
            }, index * t1 * 1000);
        })(i);
    }
}

function proceedSimulation() {
    var n = parseInt(document.getElementById("pnum").value);
    const outputDiv = document.getElementById("output2");
    var t2 = parseInt(document.getElementById("time2").value);

    const philo = [];
    const forks = [];

    for (let i = 0; i < n; i++) {
        philo.push(i);
        forks.push(i);
    }

    console.log("The initial forks' array is: " + forks);
    console.log("The initial philosophers' array is: " + philo);

    outputDiv.innerHTML = "";

    philo.reverse();
    forks.reverse();

    console.log("The reversed philosophers' array is: " + philo);
    console.log("The reversed forks' array is : " + forks);

    const firstElement1 = philo.shift();
    philo.push(firstElement1);
    console.log("The rearranged philosophers' array is: " + philo);

    const firstElement2 = forks.shift();
    forks.push(firstElement2);
    console.log("The rearranged forks' array is: " + forks);

    for (let i = 0; i < forks.length; i++) {
        ((index) => {
            setTimeout(function () {
                const numberElem = document.createElement("p");
                if (index === 0) {
                    numberElem.textContent = "Philosopher(" + philo[index] + ") picked up fork(" + forks[(forks.length - 1)] + "), eats for " + t2 + " seconds, and puts it back along with fork(" + forks[index] + "), which makes fork(" + forks[index] + ") and fork(" + forks[(forks.length - 1)] + ") available.";
                } else {
                    numberElem.textContent = "Philosopher(" + philo[index] + ") picked up fork(" + forks[index - 1] + "), eats for " + t2 + " seconds, and puts it back along with fork(" + forks[index] + "), which makes fork(" + forks[index] + ") and fork(" + forks[(index - 1)] + ") available.";
                }
                outputDiv.appendChild(numberElem);
            }, index * t2 * 1000);
        })(i);
    }
}
