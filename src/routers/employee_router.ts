import { Router } from "express";
import Employee from "../entities/employee.entity";
import dataSource from "../dataSource";

const employeeRouter = Router();

employeeRouter.get("", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:empid", async (req, res) => {
  const empId = Number(req.params.empid);
  const employeeRepository = dataSource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({ id: empId });
  res.status(200).send(employee);
  const employees = await employeeRepository.find();
});

employeeRouter.post("/", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const newEmployee = employeeRepository.create({
    email: req.body.email,
    name: req.body.name,
  });

  const newlyCreatedEmployee = await employeeRepository.save(newEmployee);

  res.status(201).send(newlyCreatedEmployee);
});

employeeRouter.patch("/:empid", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);

  await employeeRepository.update(
    { id: parseInt(req.params.empid) },
    { ...req.body }
  );
  const updatedEmployee = await employeeRepository.findOneBy({
    id: parseInt(req.params.empid),
  });

  res.status(200).send(updatedEmployee);
});

employeeRouter.put("/:empid", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  if (!("name" in req.body) || !("email" in req.body)) {
    res.status(400).send({ msg: "Required fields in request body missing" });
    return;
  }
  await employeeRepository.update(
    { id: parseInt(req.params.empid) },
    { ...req.body }
  );
  const updatedEmployee = await employeeRepository.findOneBy({
    id: parseInt(req.params.empid),
  });

  res.status(200).send(updatedEmployee);
});

employeeRouter.delete("/:empid", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.delete({ id: parseInt(req.params.empid) });
  res.status(204).send();
});

export default employeeRouter;
