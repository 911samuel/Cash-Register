function checkCashRegister(price, cash, cid) {
  const currencyUnitValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  let changeDue = cash - price;
  let changeArray = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    const currencyUnit = cid[i][0];
    const unitValue = currencyUnitValues[currencyUnit];
    const availableAmount = cid[i][1];
    const maxUnits = Math.floor(availableAmount / unitValue);
    let returnedUnits = 0;

    while (changeDue >= unitValue && returnedUnits < maxUnits) {
      changeDue -= unitValue;
      changeDue = Math.round(changeDue * 100) / 100;
      returnedUnits++;
    }

    if (returnedUnits > 0) {
      changeArray.push([currencyUnit, returnedUnits * unitValue]);
    }
  }

  const totalChangeInDrawer = cid.reduce((acc, curr) => acc + curr[1], 0);

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (Math.abs(changeDue) < 0.01 && totalChangeInDrawer === cash - price) {
    return { status: "CLOSED", change: cid };
  } else {
    return { status: "OPEN", change: changeArray };
  }
}

// Example usage:
let result = checkCashRegister(19.5, 20, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);

console.log(result);
