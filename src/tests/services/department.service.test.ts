import DepartmentService from "../../services/department.service";
import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";
import DepartmentRepository from "../../repositories/department.repository";
import Department from "../../entities/department.entity";
import UpdateDepartmentDto from "../../dto/update-department.dto";
import CreateDepartmentDto from "../../dto/create-department.dto";
import Employee from "../../entities/employee.entity";

describe("DepartmentService", () => {
  let departmentRepositoryMock: MockProxy<DepartmentRepository>;
  let departmentService: DepartmentService;

  beforeEach(() => {
    departmentRepositoryMock = mock<DepartmentRepository>();
    departmentService = new DepartmentService(departmentRepositoryMock);
  });

  describe("getDepartments", () => {
    it("should return all departments", async () => {
      const id = 1;
      when(departmentRepositoryMock.getDepartments)
        .calledWith()
        .mockReturnValue([{} as Department]);

      const result = await departmentService.getDepartments();

      expect(result).toStrictEqual([{} as Department]);
      expect(departmentRepositoryMock.getDepartments).toHaveBeenCalled();
    });
  });

  describe("getEmployeesFromDepartment", () => {
    it("called with an invalid id", async () => {
      const id = 1;
      when(departmentRepositoryMock.getEmployeesFromDepartment).calledWith(id);

      const result = await departmentService.getEmployeesFromDepartment(id);

      expect(
        departmentRepositoryMock.getEmployeesFromDepartment
      ).toHaveBeenCalledWith(id);
    });
    it("called with valid id", async () => {
      const id = 1;
      const mockResult = [{} as Employee];
      when(departmentRepositoryMock.getEmployeesFromDepartment)
        .calledWith(id)
        .mockReturnValue(mockResult);

      const result = await departmentService.getEmployeesFromDepartment(id);

      expect(result).toStrictEqual(mockResult);
      expect(
        departmentRepositoryMock.getEmployeesFromDepartment
      ).toHaveBeenCalledWith(id);
    });
  });

  describe("addEmployee", () => {
    it("called with invalid dept id", async () => {
      const deptId = 1;
      const empId = 1;
      const mockResult = {
        email: "email",
        department: { name: "some dept" },
      } as Employee;
      when(departmentRepositoryMock.addEmployee)
        .calledWith(deptId, empId)
        .mockReturnValue(mockResult);

      const result = await departmentService.addEmployee(deptId, empId);

      expect(departmentRepositoryMock.addEmployee).toHaveBeenCalledWith(
        deptId,
        empId
      );
    });
    it("called with invalid emp id", async () => {
      const deptId = 1;
      const empId = 1;
      const mockResult = {
        email: "email",
        department: { name: "some dept" },
      } as Employee;
      when(departmentRepositoryMock.addEmployee)
        .calledWith(deptId, empId)
        .mockReturnValue(mockResult);

      const result = await departmentService.addEmployee(deptId, empId);

      expect(departmentRepositoryMock.addEmployee).toHaveBeenCalledWith(
        deptId,
        empId
      );
    });
    it("called with valid ids", async () => {
      const deptId = 1;
      const empId = 1;
      const mockResult = {
        email: "email",
        department: { name: "some dept" },
      } as Employee;
      when(departmentRepositoryMock.addEmployee)
        .calledWith(deptId, empId)
        .mockReturnValue(mockResult);

      const result = await departmentService.addEmployee(deptId, empId);

      expect(result).toStrictEqual(mockResult);
      expect(departmentRepositoryMock.addEmployee).toHaveBeenCalledWith(
        deptId,
        empId
      );
    });
  });

  describe("deleteDepartment", () => {
    it("called with an invalid department id", async () => {
      const id = 2;
      when(departmentRepositoryMock.deleteDepartment).calledWith(id);
      const result = await departmentService.deleteDepartment(id);

      expect(departmentRepositoryMock.deleteDepartment).toHaveBeenCalledWith(
        id
      );
    });
    it("called with valid department id", async () => {
      const id = 1;
      when(departmentRepositoryMock.deleteDepartment).calledWith(id);

      await departmentService.deleteDepartment(id);

      expect(departmentRepositoryMock.deleteDepartment).toHaveBeenCalledWith(
        id
      );
    });
  });

  describe("deleteEmployee", () => {
    it("called with an invalid department id", async () => {
      const deptId = 1;
      const empId = 1;
      when(departmentRepositoryMock.deleteEmployee).calledWith(deptId, empId);
      const result = await departmentService.deleteEmployee(deptId, empId);

      expect(departmentRepositoryMock.deleteEmployee).toHaveBeenCalledWith(
        deptId,
        empId
      );
    });
    it("called with an invalid employee id", async () => {
      const deptId = 1;
      const empId = 1;
      when(departmentRepositoryMock.deleteEmployee).calledWith(deptId, empId);
      const result = await departmentService.deleteEmployee(deptId, empId);

      expect(departmentRepositoryMock.deleteEmployee).toHaveBeenCalledWith(
        deptId,
        empId
      );
    });
    it("called with valid ids", async () => {
      const id = 1;
      when(departmentRepositoryMock.deleteDepartment).calledWith(id);

      await departmentService.deleteDepartment(id);

      expect(departmentRepositoryMock.deleteDepartment).toHaveBeenCalledWith(
        id
      );
    });
  });

  describe("updateDepartment", () => {
    it("called with an invalid department id", async () => {
      const id = 2;
      const updateDetails = {
        name: "some dept",
      } as UpdateDepartmentDto;
      when(departmentRepositoryMock.updateDepartment)
        .calledWith(id, updateDetails)
        .mockReturnValue(updateDetails);

      await departmentService.updateDepartment(id, updateDetails);

      expect(departmentRepositoryMock.updateDepartment).toHaveBeenCalled();
    });
    it("called with valid department id", async () => {
      const id = 1;
      const updateDetails = {
        name: "some dept",
      } as UpdateDepartmentDto;
      when(departmentRepositoryMock.updateDepartment)
        .calledWith(id, updateDetails)
        .mockReturnValue(updateDetails);

      await departmentService.updateDepartment(id, updateDetails);

      const result = await departmentService.updateDepartment(
        id,
        updateDetails
      );

      expect(result).toStrictEqual(updateDetails);
      expect(departmentRepositoryMock.updateDepartment).toHaveBeenCalled();
    });
  });

  describe("createDepartmentById", () => {
    it("should create department", async () => {
      const createDetails = {
        name: "some dept",
      } as CreateDepartmentDto;
      const mockResult = new Department();
      mockResult.name = "some dept";
      when(departmentRepositoryMock.createDepartment)
        .calledWith(createDetails)
        .mockResolvedValue(mockResult);

      const result = await departmentService.createDepartment(createDetails);

      expect(result).toBeInstanceOf(Department);
      expect(departmentRepositoryMock.createDepartment).toHaveBeenCalled();
    });
  });
});
