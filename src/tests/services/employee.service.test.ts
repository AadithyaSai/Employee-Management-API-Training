import EmployeeService from "../../services/employee.service";
import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";
import EmployeeRepository from "../../repositories/employee.repository";
import Employee from "../../entities/employee.entity";
import { UpdateEmployeeDto } from "../../dto/update-employee.dto";
import { CreateEmployeeDto } from "../../dto/create-employee.dto";
import HttpException from "../../exception/httpException";

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
      when(employeeRepositoryMock.findOneById).calledWith(id);

      const result = await employeeService.getEmployeeById(id);

      expect(employeeRepositoryMock.findOneById).toHaveBeenCalledWith(id);
    });
    it("called with valid employee id", async () => {
      const id = 1;
      const mockEmployee = { name: "some-name" } as Employee;
      when(employeeRepositoryMock.findOneById)
        .calledWith(id)
        .mockReturnValue(mockEmployee);

      const result = await employeeService.getEmployeeById(id);

      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepositoryMock.findOneById).toHaveBeenCalledWith(id);
    });
  });

  describe("getAllEmployees", () => {
    it("should return all employees", async () => {
      const id = 1;
      when(employeeRepositoryMock.findAll)
        .calledWith()
        .mockReturnValue([{} as Employee]);
      const result = await employeeService.getAllEmployees();

      expect(result).toBeInstanceOf(Array<Employee>);
      expect(employeeRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getEmployeeByEmail", () => {
    it("called with an invalid email", async () => {
      const email = "someemail@example.com";
      when(employeeRepositoryMock.findOneByEmail).calledWith(email);

      const result = await employeeService.getEmployeeByEmail(email);

      expect(employeeRepositoryMock.findOneByEmail).toHaveBeenCalledWith(email);
    });
    it("called with valid email", async () => {
      const email = "someemail@example.com";
      const mockEmployee = { name: "some-name" } as Employee;
      when(employeeRepositoryMock.findOneByEmail)
        .calledWith(email)
        .mockReturnValue(mockEmployee);

      const result = await employeeService.getEmployeeByEmail(email);

      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepositoryMock.findOneByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe("getEmployeeByEmail", () => {
    it("called with an invalid email", async () => {
      const email = "someemail@example.com";
      when(employeeRepositoryMock.findOneByEmail).calledWith(email);

      const result = await employeeService.getEmployeeByEmail(email);

      expect(employeeRepositoryMock.findOneByEmail).toHaveBeenCalledWith(email);
    });
    it("called with valid email", async () => {
      const email = "someemail@example.com";
      const mockEmployee = { name: "some-name" } as Employee;
      when(employeeRepositoryMock.findOneByEmail)
        .calledWith(email)
        .mockReturnValue(mockEmployee);

      const result = await employeeService.getEmployeeByEmail(email);

      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepositoryMock.findOneByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe("deleteEmployeeById", () => {
    it("called with an invalid employee id", async () => {
      const id = 2;

      const result = await employeeService.deleteEmployeeById(id);

      expect(
        employeeRepositoryMock.deleteCascadingOneById
      ).toHaveBeenCalledWith(id);
    });
    it("called with valid employee id", async () => {
      const id = 1;
      when(employeeRepositoryMock.deleteCascadingOneById).calledWith(id);

      await employeeService.deleteEmployeeById(id);

      expect(
        employeeRepositoryMock.deleteCascadingOneById
      ).toHaveBeenCalledWith(id);
    });
  });

  describe("updateEmployeeById", () => {
    it("called with an invalid employee id", async () => {
      const id = 2;
      const updateDetails = {
        password: "password",
        email: "email",
      } as UpdateEmployeeDto;
      when(employeeRepositoryMock.updateOneById)
        .calledWith(id, {
          password: expect.anything(),
          email: "email",
        })
        .mockReturnValue({ email: "" });

      await employeeService.updateEmployeeById(id, updateDetails);

      expect(employeeRepositoryMock.updateOneById).toHaveBeenCalled();
    });
    it("called with valid employee id with password", async () => {
      const id = 1;
      const updateDetails = {
        password: "password",
        email: "email",
      } as UpdateEmployeeDto;
      const mockEmployee = new Employee();
      mockEmployee.email = "email";
      when(employeeRepositoryMock.updateOneById)
        .calledWith(id, {
          password: expect.anything(),
          email: "email",
        } as Employee)
        .mockReturnValue(mockEmployee);

      const result = await employeeService.updateEmployeeById(
        id,
        updateDetails
      );

      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepositoryMock.updateOneById).toHaveBeenCalled();
    });
    it("called with valid employee id without password", async () => {
      const id = 1;
      const updateDetails = {} as UpdateEmployeeDto;
      const mockEmployee = new Employee();
      mockEmployee.email = "email";
      when(employeeRepositoryMock.updateOneById)
        .calledWith(id, {} as Employee)
        .mockReturnValue(mockEmployee);

      const result = await employeeService.updateEmployeeById(
        id,
        updateDetails
      );

      expect(result).toStrictEqual(mockEmployee);
      expect(employeeRepositoryMock.updateOneById).toHaveBeenCalled();
    });
  });

  describe("createEmployeeById", () => {
    it("should create employee", async () => {
      const createDetails = {
        password: "password",
        email: "email",
      } as CreateEmployeeDto;
      const mockEmployee = new Employee();
      mockEmployee.email = "email";
      when(employeeRepositoryMock.create)
        .calledWith({ password: expect.anything(), email: "email" } as Employee)
        .mockResolvedValue(mockEmployee);

      const result = await employeeService.createEmployee(createDetails);

      expect(result).toBeInstanceOf(Employee);
      expect(employeeRepositoryMock.create).toHaveBeenCalled();
    });
  });
});
