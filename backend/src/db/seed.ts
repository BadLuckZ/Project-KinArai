import { db } from "./connection";

console.log("Setting restaurant data seed...");

const count = db.query("SELECT COUNT(*) as count FROM menu").get() as {
  count: number;
};

if (count.count > 0) {
  console.log("Already have records. Skipping seeding");
  process.exit(0);
}

const insert = db.prepare("INSERT INTO menu (name, category) VALUES (?, ?)");

const seedData = db.transaction((items: [string, string][]) => {
  for (const [name, category] of items) {
    insert.run(name, category);
  }
});

seedData([
  ["ข้าวมันไก่", "rice"],
  ["ข้าวกะเพราหมูกรอบ", "rice"],
  ["ก๋วยเตี๋ยวเรือ", "noodle"],
  ["บะหมี่แห้ง", "noodle"],
  ["ส้มตำไทย", "somtam"],
  ["ข้าวซอย", "noodle"],
  ["ผัดไทย", "noodle"],
  ["ข้าวหมูแดง", "rice"],
  ["ราดหน้า", "noodle"],
  ["ต้มยำกุ้ง", "soup"],
]);

console.log("Setting restaurant data seed success");
