let head, direction, queue;

function runSimulation() {
    const queueInput = document.getElementById("queue").value.trim();
    if (!queueInput) {
        alert("Please enter the queue values separated by commas.");
        return;
    }

    queue = queueInput.split(",").map(num => parseInt(num.trim()));

    if (queue.some(isNaN)) {
        alert("Please ensure all queue values are valid integers.");
        return;
    }

    head = parseInt(document.getElementById("head").value);
    if (isNaN(head) || head < 0) {
        alert("!! Please enter a valid head value (non-negative integer) !!");
        return;
    }

    direction = parseInt(document.getElementById("direction").value);
    if (![0, 1].includes(direction)) {
        alert("Direction must be 0 (right) or 1 (left).");
        return;
    }

    document.getElementById("output1").innerHTML = "The array entered by the user is: " + queue.join(", ");

    if (direction === 1) {
        // Left direction: elements < head descending, then elements >= head descending
        queue = queue
            .filter(q => q < head).sort((a, b) => b - a)
            .concat(queue.filter(q => q >= head).sort((a, b) => b - a));
    } else {
        // Right direction: elements >= head ascending, then elements < head ascending
        queue = queue
            .filter(q => q >= head).sort((a, b) => a - b)
            .concat(queue.filter(q => q < head).sort((a, b) => a - b));
    }

    console.log("Seek sequence:", queue);

    // Calculate total seek operations (example logic for LOOK algorithm)
    let totalSeekOps = 0;
    let currentPos = head;

    for (let i = 0; i < queue.length; i++) {
        totalSeekOps += Math.abs(queue[i] - currentPos);
        currentPos = queue[i];
    }

    console.log("Total seek operations:", totalSeekOps);

    document.getElementById("output2").innerHTML = 
        "The seek sequence is: " + queue.join(", ") + 
        "<br>The total number of seek operations is: " + totalSeekOps;
}

let myChart;  // Store chart instance globally

function printGraph() {
    if (!queue || queue.length === 0) {
        alert("Please run the simulation first.");
        return;
    }

    const labels = queue.map((_, i) => i + 1);
    const data = queue;

    const config = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Seek sequence",
                    data: data,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                },
            ],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Look Disk Scheduling Algorithm",
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Sequence Step",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Track Number",
                    },
                    ticks: {
                        stepSize: 1,
                    },
                },
            },
        },
    };

    const ctx = document.getElementById("myChart").getContext("2d");

    // Destroy existing chart if present to avoid overlap
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, config);
}
