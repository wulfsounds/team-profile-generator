const Employee = require("../lib/employee");

describe("Employee", () => {
    describe("getName", () => {
        test("Should return an object containing a string property", () => {
            
            expect(Employee.getName('string')).toBe(true);
        });
    })
})