const fixtures = [];
const stack = [];

function describe(name, sectionFn) {
  stack.push(name);
  sectionFn();
  stack.pop();
}

function it(name, fn) {
  const fixturePath = [...stack];
  fixtures.push(() => {
    try {
      fn();
      console.log(`Passed: ${fixturePath.join(" :: ")}  "${name}"`);
    } catch (e) {
      console.warn(`Failed: ${fixturePath.join(" :: ")}  "${name}":`);
      console.warn(e);
    }
  });
}

function assertEq(value1, value2) {
  if (value1 !== value2) throw new Error(`${value1} !== ${value2}`);
}

function testTests() {
  it("level 0 test a", () => {
    throw "fail level 0 test a";
  });

  describe("section 1", () => {
    it("level 1 test a", () => {
      throw "fail level 1 test a";
    });
    it("level 1 test b", () => {
      throw "fail level 1 test b";
    });

    describe("section 2", () => {
      it("level 2 test", () => {
        throw "fail level 2 test";
      });
    });
  });

  it("level 0 test b", () => {
    throw "fail level 0 test b";
  });

  it("test", () => {
    if (true) {
      throw "nope";
    }
  });
}

function runTests() {
  fixtures.forEach((fixtureFn) => fixtureFn());
}
