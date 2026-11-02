import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/components/DiaryDateCalendar.module.css";

function DiaryDateCalendar({ selectedDate, onDateChange }) {
  // YYYY-MM-DD string değerini yerel Date nesnesine dönüştürür.
  const dateParts = selectedDate.split("-").map(Number);
  const calendarDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  const handleDateChange = (date) => {
    if (!date) return;

    // UTC dönüşümü kullanmadan yerel tarihi oluşturuyoruz.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    onDateChange(`${year}-${month}-${day}`);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Select a date</h2>

      <DatePicker
        selected={calendarDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className={styles.input}
        placeholderText="Select a date"
        calendarClassName={styles.calendar}
        showPopperArrow={false}
      />
    </section>
  );
}

export default DiaryDateCalendar;
