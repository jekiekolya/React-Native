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
      return "Січня";
    case 2:
      return "Лютого";
    case 3:
      return "Березня";
    case 4:
      return "Квітня";
    case 5:
      return "Травня";
    case 6:
      return "Червня";
    case 7:
      return "Липня";
    case 8:
      return "Серпня";
    case 9:
      return "Вересня";
    case 10:
      return "Жовтня";
    case 11:
      return "Листопада";
    case 12:
      return "Грудня";
    default:
      return "";
  }
}
