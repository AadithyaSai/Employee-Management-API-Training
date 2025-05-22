import EmployeeService from "../../services/employee.service";
import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";
import EmployeeRepository from "../../repositories/employee.repository";
import Employee from "../../entities/employee.entity";

describe("EmployeeService", () => {
  let employeeRepositoryMock: MockProxy<EmployeeRepository>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    employeeRepositoryMock = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepositoryMock);
  });

  describe("getEmployeeById", () => {
    it("called with an invalid employee id", async () => {
      const id = 2;
      when(employeeRepositoryMock.fineOneById)
        .calledWith(id)
        .mockReturnValue({});

      const result = employeeService.getEmployeeById(id);

      expect(result).resolves.toStrictEqual({});
      expect(employeeRepositoryMock.fineOneById).toHaveBeenCalledWith(id);
    });
    it("called with valid employee id", async () => {
      const id = 1;
      const mockEmployee = { name: "some-name" } as Employee;
      when(employeeRepositoryMock.fineOneById)
        .calledWith(id)
        .mockReturnValue(mockEmployee);

      const result = await employeeService.getEmployeeById(id);

      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepositoryMock.fineOneById).toHaveBeenCalledWith(id);
    });
  });
});
