export default function getFormatDataForComment(date) {
  const DATE = new Date(date);
  const day = DATE.getDate().toString().padStart(2, "0");
  const month = getNameMonth(DATE.getMonth() + 1);
  const year = DATE.getFullYear();
  const hour = DATE.getHours().toString().padStart(2, "0");
  const minute = DATE.getMinutes().toString().padStart(2, "0");

  return `${day} ${month}, ${year} | ${hour}:${minute}`;
}

function getNameMonth(month) {
  switch (month) {
    case 1:
      return "Січеня";
    case 2:
      return "Лютого";
    case 3:
      return "Березеня";
    case 4:
      return "Квітеня";
    case 5:
      return "Травеня";
    case 6:
      return "Червеня";
    case 7:
      return "Липеня";
    case 8:
      return "Серпеня";
    case 9:
      return "Вересеня";
    case 10:
      return "Жовтеня";
    case 11:
      return "Листопада";
    case 12:
      return "Груденя";
    default:
      return "";
  }
}
