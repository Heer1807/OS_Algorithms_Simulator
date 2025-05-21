let processes = [];
let time = 0;
let PROCESS_ID_COUNTER = 1;

function addProcess() {
  const arrivalTime = parseInt(document.getElementById("arrival-time-input").value);
  const burstTime = parseInt(document.getElementById("burst-time-input").value);

  if (arrivalTime < 0) {
    alert("Arrival Time can't be negative");
    return;
  } else if (burstTime <= 0) {
    alert("Burst Time can't be 0 or negative");
    return;
  }

  const newProcess = {
    id: 'P' + PROCESS_ID_COUNTER,
    arrivalTime,
    burstTime,
    completionTime: 0,
    turnaroundTime: 0,
    waitingTime: 0,
  };

  PROCESS_ID_COUNTER++;
  processes.push(newProcess);
  updateTable();

  document.getElementById("arrival-time-input").value = "";
  document.getElementById("burst-time-input").value = "";
}

function updateTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  processes.forEach((proc, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${proc.id}</td>
      <td>${proc.arrivalTime}</td>
      <td>${proc.burstTime}</td>
      <td>${proc.completionTime}</td>
      <td>${proc.turnaroundTime}</td>
      <td>${proc.waitingTime}</td>
      <td><button onclick="deleteProcess(${i})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteProcess(index) {
  processes.splice(index, 1);
  updateTable();
}

function reset() {
  location.reload();
}

function runSJF() {
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime);

  let totalCompletionTime = 0, totalTurnaroundTime = 0, totalWaitingTime = 0;
  let completedProcesses = 0, completionTimes = [], arr_ct = [], arr_pi = [];

  while (completedProcesses < processes.length) {
    let minBurstTime = Number.MAX_SAFE_INTEGER;
    let selectedProcessIndex = -1;

    processes.forEach((proc, i) => {
      if (proc.arrivalTime <= time && proc.burstTime < minBurstTime && !completionTimes.includes(proc.id)) {
        minBurstTime = proc.burstTime;
        selectedProcessIndex = i;
      }
    });

    if (selectedProcessIndex !== -1) {
      const proc = processes[selectedProcessIndex];
      proc.completionTime = time + proc.burstTime;
      proc.turnaroundTime = proc.completionTime - proc.arrivalTime;
      proc.waitingTime = proc.turnaroundTime - proc.burstTime;

      totalCompletionTime += proc.completionTime;
      totalTurnaroundTime += proc.turnaroundTime;
      totalWaitingTime += proc.waitingTime;
      time = proc.completionTime;

      completionTimes.push(proc.id);
      arr_ct.push(proc.completionTime);
      arr_pi.push(proc.id);
      completedProcesses++;
    } else {
      time++;
    }
  }

  const numProcesses = processes.length;
  document.getElementById("output1").innerHTML = `The Average Completion time is: ${(totalCompletionTime / numProcesses).toFixed(2)}`;
  document.getElementById("output2").innerHTML = `The Average Turn-around time is: ${(totalTurnaroundTime / numProcesses).toFixed(2)}`;
  document.getElementById("output3").innerHTML = `The Average Waiting time is: ${(totalWaitingTime / numProcesses).toFixed(2)}`;
  updateTable();

  drawChart(arr_pi, arr_ct);
}

function drawChart(arr_pi, arr_ct) {
  const colors = ["#d3e1b5", "#9bcfe0", "#e09bd2", "#e87777", "#a8f796", "#b0f287", "#f49381", "#b2ffda", "#ffd580"];
  const row1 = document.getElementById("row1");
  const row2 = document.getElementById("row2");

  row1.innerHTML = "";
  row2.innerHTML = "";

  let pidlabel = row1.insertCell(0);
  let ctlabel = row2.insertCell(0);
  pidlabel.innerHTML = "Process ID";
  ctlabel.innerHTML = "Completion Time";
  pidlabel.style.background = "#e0e0e0";
  ctlabel.style.background = "#e0e0e0";

  arr_ct.forEach((ct, i) => {
    const color = colors[i % colors.length];
    let pidCell = row1.insertCell(i + 1);
    let ctCell = row2.insertCell(i + 1);
    pidCell.innerHTML = arr_pi[i];
    ctCell.innerHTML = ct;
    pidCell.style.backgroundColor = color;
    ctCell.style.backgroundColor = color;
  });
}
