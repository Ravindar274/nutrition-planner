
const IFCT_FOOD_VALUES = {
  "Rice": { energy: 1491, protein: 7.94, fat: 0.52, cho: 78.24, fiber: 2.81, sodium: 2.34, potassium: 108, moisture: 9.93 },
  "Jowar": { energy: 1398, protein: 9.97, fat: 1.73, cho: 67.68, fiber: 0.0, sodium: 5.42, potassium: 328, moisture: 9.01 },
  "Wheat Flour": { energy: 1472, protein: 10.36, fat: 0.76, cho: 74.27, fiber: 0.0, sodium: 1.54, potassium: 148, moisture: 11.34 },
  "Red Gram Dal": { energy: 1384, protein: 21.70, fat: 1.56, cho: 55.23, fiber: 0.0, sodium: 18.01, potassium: 1395, moisture: 9.20 },
  "Spinach": { energy: 102, protein: 2.14, fat: 0.64, cho: 2.05, fiber: 0.0, sodium: 42.55, potassium: 625, moisture: 90.31 },
  "Onion":  { energy: 107, protein: 2.07, fat: 0.26, cho: 2.99, fiber: 0.0, sodium: 0.0, potassium: 0.0, moisture: 0.0 },
  "Tomato":  { energy: 82, protein: 0.90, fat: 0.47, cho: 2.71, fiber: 0.0, sodium: 9.73, potassium: 204, moisture: 93.62 },
  "Almonds":  { energy: 2549, protein: 18.41, fat: 58.49, cho: 3.04, fiber: 0.0, sodium: 1.50, potassium: 699, moisture: 4.37 },
  "Milk Buffalo":  { energy: 449, protein: 3.68, fat: 6.58, cho: 8.39, fiber: 0.0, sodium: 30.10, potassium: 109, moisture: 80.68 },
  "Egg Whole":  { energy: 618, protein: 13.43, fat: 10.54, cho: 0.0, fiber: 0.0, sodium: 121, potassium: 127, moisture: 73.46 },
  "Chicken":  { energy: 704, protein: 21.81, fat: 9.00, cho: 0.0, fiber: 0.0, sodium: 36.70, potassium: 295, moisture: 67.15 },
  "Apple":  { energy: 267, protein: 0.31, fat: 0.53, cho: 13.9, fiber: 0.0, sodium: 1.43, potassium: 116, moisture: 83.01 },
  "Water melon (Suger baby)":  { energy: 85, protein: 0.60, fat: 0.16, cho: 3.86, fiber: 0.0, sodium: 1.89, potassium: 124, moisture: 94.54 },
  "Carrot":  { energy: 139, protein: 0.95, fat: 0.47, cho: 5.55, fiber: 0.0, sodium: 52.33, potassium: 273, moisture: 87.69 },
  "Cucumber":  { energy: 82, protein: 0.71, fat: 0.16, cho: 3.48, fiber: 0.0, sodium: 6.33, potassium: 183, moisture: 92.96 },
  "Bottle gourd":  { energy: 46, protein: 0.53, fat: 0.13, cho: 1.68, fiber: 0.0, sodium: 1.46, potassium: 124, moisture: 95.17 },
  "Lemon Juice":  { energy: 153, protein: 0.41, fat: 0.75, cho: 0.0, fiber: 0.0, sodium: 1.21, potassium: 113, moisture: 91.59 },
  "Lentil Dal":  { energy: 1349, protein: 24.35, fat: 0.75, cho: 52.53, fiber: 0.0, sodium: 10.27, potassium: 786, moisture: 9.71 },
  "Brown Rice":  { energy: 1490, protein: 9.16, fat: 1.24, cho: 74.80, fiber: 0.0, sodium: 3.64, potassium: 199, moisture: 9.33 },
  "Black Gram Dal":  { energy: 1356, protein: 23.06, fat: 1.69, cho: 51.00, fiber: 0.0, sodium: 18.88, potassium: 1157, moisture: 9.16 },
  "Bengal Gram Dal":  { energy: 1377, protein: 21.55, fat: 5.31, cho: 46.72, fiber: 0.0, sodium: 20.83, potassium: 957, moisture: 9.18 },
  "Peas":  { energy: 1269, protein: 20.43, fat: 1.89, cho: 48.93, fiber: 0.0, sodium: 23.40, potassium: 922, moisture: 9.33 },
  "Onion Small":  { energy: 237, protein: 1.82, fat: 0.16, cho: 11.58, fiber: 0.0, sodium: 4.06, potassium: 160, moisture: 84.67 },
  "Ground nut":  { energy: 2176, protein: 23.65, fat: 39.63, cho: 17.27, fiber: 0.0, sodium: 12.21, potassium: 679, moisture: 6.97 },
  "Coconut water":  { energy: 64, protein: 0.26, fat: 0.16, cho: 0.0, fiber: 0.0, sodium: 28.09, potassium: 215, moisture: 95.77 }
};


let foodRowCounter = 0;

function addRow() {
  const tbody = document.getElementById('tableBody');
  const row = document.createElement('tr');
  const selectId = `food-select-${foodRowCounter++}`;

  let options = '<option value="">--Select--</option>';
  for (const food in IFCT_FOOD_VALUES) {
    options += `<option value="${food}">${food}</option>`;
  }

  row.innerHTML = `
    <td><select class="food-select" id="${selectId}">${options}</select></td>
    <td><input type="number" value="0" step="any" oninput="updateNutrition(this)"></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><button class="remove-btn" onclick="removeRow(this)" title="Remove Row">&times;</button></td>
  `;

  tbody.appendChild(row);

  const $select = $(`#${selectId}`);
  $select.select2();
  
  // Use Select2 event to trigger update
  $select.on('select2:select', function () {
    updateNutrition(this); // `this` is the select element
  });
}


function updateNutrition(element) {
  const row = element.closest('tr');
  const select = row.cells[0].querySelector('select');
  const qtyInput = row.cells[1].querySelector('input');
  const quantity = parseFloat(qtyInput.value) || 0;
  const food = select.value;
  const data = IFCT_FOOD_VALUES[food];

  if (data) {
    row.cells[2].querySelector('input').value = ((quantity * data.energy) / 100 * 0.25).toFixed(2);
    row.cells[3].querySelector('input').value = ((quantity * data.protein) / 100).toFixed(2);
    row.cells[4].querySelector('input').value = ((quantity * data.cho) / 100).toFixed(2);
    row.cells[5].querySelector('input').value = ((quantity * data.fat) / 100).toFixed(2);
    row.cells[6].querySelector('input').value = ((quantity * data.fiber) / 100).toFixed(2);
    row.cells[7].querySelector('input').value = ((quantity * data.sodium) / 100).toFixed(2);
    row.cells[8].querySelector('input').value = ((quantity * data.potassium) / 100).toFixed(2);
    row.cells[9].querySelector('input').value = ((quantity * data.moisture) / 100).toFixed(2);
  } else {
    for (let i = 2; i <= 9; i++) {
      row.cells[i].querySelector('input').value = "0.00";
    }
  }

  calculateTotals();
}

function removeRow(button) {
  const row = button.closest("tr");
  const select = row.querySelector('select');
  if (select) $(select).select2('destroy');
  row.remove();
  calculateTotals();
}

function calculateTotals() {
  const fields = ["energy", "protein", "cho", "fat", "fiber", "sodium", "potassium", "moisture"];
  const totals = Object.fromEntries(fields.map(f => [f, 0]));

  const tbody = document.getElementById('tableBody');

  for (const row of tbody.rows) {
    fields.forEach((field, index) => {
      totals[field] += parseFloat(row.cells[2 + index].querySelector('input').value) || 0;
    });
  }

  fields.forEach((field, index) => {
    document.getElementById('total' + capitalize(field)).textContent = totals[field].toFixed(2);
  });

  const rda = Object.fromEntries(fields.map(f => [f, parseFloat(document.getElementById('rda' + capitalize(f)).value) || 0]));

  fields.forEach((field, index) => {
    document.getElementById('diff' + capitalize(field)).textContent = (totals[field] - rda[field]).toFixed(2);
  });
}

function toggleIFCTTable() {
  const container = document.getElementById("ifctTableContainer");
  const button = event.target;

  if (container.style.display === "none") {
    populateIFCTTable();
    container.style.display = "block";
    button.textContent = "Hide IFCT Food Table";
  } else {
    container.style.display = "none";
    button.textContent = "Show IFCT Food Table";
  }
}

function populateIFCTTable() {
  const tbody = document.querySelector("#ifctTable tbody");
  tbody.innerHTML = "";

  for (const food in IFCT_FOOD_VALUES) {
    const item = IFCT_FOOD_VALUES[food];
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${food}</td>
      <td>${item.energy}</td>
      <td>${item.protein}</td>
      <td>${item.fat}</td>
      <td>${item.cho}</td>
      <td>${item.fiber}</td>
      <td>${item.sodium}</td>
      <td>${item.potassium}</td>
      <td>${item.moisture}</td>
    `;

    tbody.appendChild(row);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

window.onload = () => addRow();

$(document).on('select2:open', () => {
  let searchField = document.querySelector('.select2-container--open .select2-search__field');
  if (searchField) searchField.focus();
});
