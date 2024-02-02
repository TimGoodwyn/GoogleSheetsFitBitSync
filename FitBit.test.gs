describe("forEachRequiredField", () => {
  it("unpacks a single required field without nesting", () => {
    const requiredFields = { time: 0, shape: 1, fruit: 2, person: 3 };
    const fields = ["colour", "fruit"];
    const stats = {
      colour: "red",
      fruit: "apple",
      name: "Gala",
    };
    const output = [];
    const fieldFn = (fieldName, column, value) => {
      output.push([fieldName, column, value]);
    };
    forEachRequiredField(stats, fields, requiredFields, fieldFn);

    assertEq(output.length, 1);
    assertEq(output[0].length, 3);
    assertEq(output[0][0], "fruit");
    assertEq(output[0][1], 2);
    assertEq(output[0][2], "apple");
  });

  it("unpacks a single required field nested inside an object", () => {
    const requiredFields = { time: 0, shape: 1, fruit: 2, person: 3 };
    const fields = { food: ["colour", "fruit"] };
    const stats = {
      food: {
        colour: "red",
        fruit: "apple",
        name: "Gala",
      },
    };
    const output = [];
    const fieldFn = (fieldName, column, value) => {
      output.push([fieldName, column, value]);
    };
    forEachRequiredField(stats, fields, requiredFields, fieldFn);

    assertEq(output.length, 1);
    assertEq(output[0].length, 3);
    assertEq(output[0][0], "fruit");
    assertEq(output[0][1], 2);
    assertEq(output[0][2], "apple");
  });
});
