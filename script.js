const IFCT_FOOD_VALUES = {
  "Rice": { energy: 1491, protein: 7.94, fat: 0.52, cho: 78.24, fiber: 2.81 },
  "Jowar": { energy: 1398, protein: 9.97, fat: 1.73, cho: 67.68, fiber: 0.0 },
  "Wheat Flour": { energy: 1472, protein: 10.36, fat: 0.76, cho: 74.27, fiber: 0.0 },
  "Red Gram Dal": { energy: 1384, protein: 21.70, fat: 1.56, cho: 55.23, fiber: 0.0 },
  "Spinach": { energy: 102, protein: 2.14, fat: 0.64, cho: 2.05, fiber: 0.0 },
  "Onion": { energy: 107, protein: 2.07, fat: 0.26, cho: 2.99, fiber: 0.0 },
  "Tomato": { energy: 82, protein: 0.90, fat: 0.47, cho: 2.71, fiber: 0.0 },
  "Almonds": { energy: 2549, protein: 18.41, fat: 58.49, cho: 3.04, fiber: 0.0 },
  "Milk Buffalo": { energy: 449, protein: 3.68, fat: 6.58, cho: 8.39, fiber: 0.0 },
  "Egg Whole": { energy: 618, protein: 13.43, fat: 10.54, cho: 0.0, fiber: 0.0 },
  "Chicken": { energy: 704, protein: 21.81, fat: 9.00, cho: 0.0, fiber: 0.0 },
  "Apple": { energy: 267, protein: 0.31, fat: 0.53, cho: 13.9, fiber: 0.0 },
  "Carrot": { energy: 139, protein: 0.95, fat: 0.47, cho: 5.55, fiber: 0.0 },
  "Peas": { energy: 1269, protein: 20.43, fat: 1.89, cho: 48.93, fiber: 0.0 },
  "Ground nut": { energy: 2176, protein: 23.65, fat: 39.63, cho: 17.27, fiber: 0.0 }
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
    <td><select class="food-select" id="${selectId}" onchange="updateNutrition(this)">${options}</select></td>
    <td><input type="number" value="0" step="any" oninput="updateNutrition(this)"></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><input type="number" value="0" readonly></td>
    <td><button class="remove-btn" onclick="removeRow(this)" title="Remove Row">&times;</button></td>

  `;

  tbody.appendChild(row);
  $(`#${selectId}`).select2();
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
  } else {
    for (let i = 2; i <= 6; i++) {
      row.cells[i].querySelector('input').value = "0.00";
    }
  }

  calculateTotals();
}

function calculateTotals() {
  let totals = { energy: 0, protein: 0, cho: 0, fat: 0, fiber: 0 };
  const tbody = document.getElementById('tableBody');

  for (const row of tbody.rows) {
    totals.energy += parseFloat(row.cells[2].querySelector('input').value) || 0;
    totals.protein += parseFloat(row.cells[3].querySelector('input').value) || 0;
    totals.cho += parseFloat(row.cells[4].querySelector('input').value) || 0;
    totals.fat += parseFloat(row.cells[5].querySelector('input').value) || 0;
    totals.fiber += parseFloat(row.cells[6].querySelector('input').value) || 0;
  }

  document.getElementById('totalEnergy').textContent = totals.energy.toFixed(2);
  document.getElementById('totalProtein').textContent = totals.protein.toFixed(2);
  document.getElementById('totalCHO').textContent = totals.cho.toFixed(2);
  document.getElementById('totalFat').textContent = totals.fat.toFixed(2);
  document.getElementById('totalFiber').textContent = totals.fiber.toFixed(2);

  const rda = {
    energy: parseFloat(document.getElementById('rdaEnergy').value) || 0,
    protein: parseFloat(document.getElementById('rdaProtein').value) || 0,
    cho: parseFloat(document.getElementById('rdaCHO').value) || 0,
    fat: parseFloat(document.getElementById('rdaFat').value) || 0,
    fiber: parseFloat(document.getElementById('rdaFiber').value) || 0
  };

  document.getElementById('diffEnergy').textContent = (totals.energy - rda.energy).toFixed(2);
  document.getElementById('diffProtein').textContent = (totals.protein - rda.protein).toFixed(2);
  document.getElementById('diffCHO').textContent = (totals.cho - rda.cho).toFixed(2);
  document.getElementById('diffFat').textContent = (totals.fat - rda.fat).toFixed(2);
  document.getElementById('diffFiber').textContent = (totals.fiber - rda.fiber).toFixed(2);
}

function removeRow(button) {
  const row = button.closest("tr");
  const select = row.querySelector('select');
  if (select) $(select).select2('destroy');
  row.remove();
  calculateTotals();
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
    `;

    tbody.appendChild(row);
  }
}

window.onload = () => addRow();

// Auto-focus the search box when select2 dropdown opens
$(document).on('select2:open', () => {
  let searchField = document.querySelector('.select2-container--open .select2-search__field');
  if (searchField) {
    searchField.focus();
  }
});

