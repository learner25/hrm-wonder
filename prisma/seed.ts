import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Departments
  const departments = await prisma.department.createMany({
    data: [
      { name: "Engineering" },
      { name: "Human Resources" },
      { name: "Finance" },
      { name: "Marketing" },
    ],
  });

  console.log("✅ Departments created.");

  // Retrieve them for foreign key reference
  const allDepartments = await prisma.department.findMany();

  // 2️⃣ Employees
  const employees = await prisma.employee.createMany({
    data: [
      {
        name: "Alice Johnson",
        email: "alice@company.com",
        position: "Software Engineer",
        departmentId: allDepartments.find((d) => d.name === "Engineering")!.id,
        salary: 60000,
      },
      {
        name: "Bob Smith",
        email: "bob@company.com",
        position: "HR Manager",
        departmentId: allDepartments.find((d) => d.name === "Human Resources")!.id,
        salary: 55000,
      },
      {
        name: "Charlie Brown",
        email: "charlie@company.com",
        position: "Accountant",
        departmentId: allDepartments.find((d) => d.name === "Finance")!.id,
        salary: 50000,
      },
      {
        name: "Diana Prince",
        email: "diana@company.com",
        position: "Marketing Lead",
        departmentId: allDepartments.find((d) => d.name === "Marketing")!.id,
        salary: 65000,
      },
    ],
  });

  console.log("✅ Employees created.");

  // 3️⃣ Attendance
  const allEmployees = await prisma.employee.findMany();

  for (const emp of allEmployees) {
    await prisma.attendance.createMany({
      data: [
        {
          employeeId: emp.id,
          date: new Date("2025-11-01"),
          status: "Present",
        },
        {
          employeeId: emp.id,
          date: new Date("2025-11-02"),
          status: "Absent",
        },
        {
          employeeId: emp.id,
          date: new Date("2025-11-03"),
          status: "Present",
        },
      ],
    });
  }

  console.log("✅ Attendance records created.");

  // 4️⃣ Leaves
  const alice = allEmployees.find((e) => e.name === "Alice Johnson");
  const bob = allEmployees.find((e) => e.name === "Bob Smith");

  if (alice && bob) {
    await prisma.leave.createMany({
      data: [
        {
          employeeId: alice.id,
          reason: "Vacation",
          startDate: new Date("2025-11-05"),
          endDate: new Date("2025-11-10"),
          status: "Approved",
        },
        {
          employeeId: bob.id,
          reason: "Medical Leave",
          startDate: new Date("2025-11-03"),
          endDate: new Date("2025-11-04"),
          status: "Pending",
        },
      ],
    });
  }

  console.log("✅ Leave records created.");
  console.log("🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
